(() => {
  "use strict";

  const form = document.getElementById("inquiry-form");
  if (!form) return;

  const fields = document.getElementById("inquiry-fields");
  const review = document.getElementById("inquiry-review");
  const reviewContent = document.getElementById("review-content");
  const reviewButton = document.getElementById("review-button");
  const editButton = document.getElementById("edit-button");
  const sendButton = document.getElementById("send-button");
  const success = document.getElementById("inquiry-success");
  const status = document.getElementById("inquiry-status");
  const error = document.getElementById("inquiry-error");
  const fieldLabels = [
    ["name", "お名前"],
    ["company", "会社名"],
    ["email", "メールアドレス"],
    ["phone", "電話番号"],
    ["topic", "ご相談の種類"],
    ["message", "ご相談内容"],
  ];
  let reviewing = false;
  let pending = false;
  reviewButton.hidden = false;

  const clearError = () => {
    error.hidden = true;
    error.textContent = "";
  };

  const edit = () => {
    if (pending) return;
    reviewing = false;
    review.hidden = true;
    fields.hidden = false;
    clearError();
    form.elements.namedItem("name").focus();
  };

  const prepareReview = () => {
    if (pending) return;
    clearError();
    // Whitespace-only required values must not pass native validation.
    for (const [name] of fieldLabels) {
      const field = form.elements.namedItem(name);
      field.value = field.value.trim();
    }
    fields.hidden = false;
    if (!form.reportValidity()) return;

    reviewContent.replaceChildren();
    for (const [name, label] of fieldLabels) {
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = form.elements.namedItem(name).value || "未入力";
      reviewContent.append(term, description);
    }
    reviewing = true;
    fields.hidden = true;
    review.hidden = false;
    document.getElementById("review-title").focus();
  };

  reviewButton.addEventListener("click", prepareReview);
  editButton.addEventListener("click", edit);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pending) return;
    // Pressing Enter in an input also opens the confirmation, never sends it.
    if (!reviewing) {
      prepareReview();
      return;
    }
    if (!form.checkValidity()) {
      edit();
      form.reportValidity();
      return;
    }

    pending = true;
    sendButton.disabled = true;
    editButton.disabled = true;
    form.setAttribute("aria-busy", "true");
    clearError();
    status.textContent = "送信しています。画面を閉じずにお待ちください。";
    const controller = new AbortController();
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 30000);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) {
        error.textContent = response.status === 429
          ? "現在、フォームでの送信を受け付けられません。入力内容は残っています。下記のメールまたはお電話でご連絡ください。"
          : "送信を完了できませんでした。入力内容は残っています。時間をおいて再度送信するか、下記のメールまたはお電話でご連絡ください。";
        error.hidden = false;
        return;
      }

      reviewing = false;
      review.hidden = true;
      fields.hidden = true;
      success.hidden = false;
      form.reset();
      reviewContent.replaceChildren();
      document.getElementById("success-title").focus();
      // Only a confirmed successful request is a lead. Never send field values.
      if (typeof window.gtag === "function") {
        try {
          window.gtag("event", "generate_lead", {
            form_id: "em_contact",
            contact_method: "form",
          });
        } catch (_) {
          // Analytics must not affect the completed inquiry.
        }
      }
    } catch (_) {
      error.textContent = timedOut
        ? "通信に時間がかかり、送信結果を確認できませんでした。すでに受け付けられている可能性があります。重複送信を避けるため、下記のメールまたはお電話で受信状況をお問い合わせください。入力内容は残っています。"
        : "通信エラーで送信結果を確認できませんでした。入力内容は残っています。すでに受け付けられている可能性もあるため、下記のメールまたはお電話でご確認ください。";
      error.hidden = false;
    } finally {
      clearTimeout(timeout);
      pending = false;
      sendButton.disabled = false;
      editButton.disabled = false;
      form.removeAttribute("aria-busy");
      status.textContent = "";
    }
  });
})();
