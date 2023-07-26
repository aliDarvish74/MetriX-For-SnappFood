const renderAuthPage = () => {
  $("#message-card").hide();
  $("#form-card").hide();
  $("#error-tooltip").hide();

  $("#message-card").fadeIn(500).animate({ bottom: "50" });
  $("#form-card").fadeIn(500).animate({ top: "50" });
};

const showErrorTooltip = () => {
  $("#error-tooltip").removeClass("d-none").fadeIn(500);
  setTimeout(() => {
    $("#error-tooltip").fadeOut(500);
  }, 4000);
  setTimeout(() => {
    $("#error-tooltip").addClass("d-none");
  }, 4500);
};

const showSuccessTooltip = () => {
  $("#success-tooltip").removeClass("d-none").fadeIn(500);
  setTimeout(() => {
    $("#success-tooltip").fadeOut(500);
  }, 4000);
  setTimeout(() => {
    $("#success-tooltip").addClass("d-none");
  }, 4500);
};

const signInValidation = () => {
  const signInErrors = [];
  const credentials = $("#login-credential").val().trim();
  const password = $("#login-password").val().trim();
  if (!credentials) {
    signInErrors.push("Credential cannot be empty.");
  }
  if (credentials.length < 3) {
    signInErrors.push("Minimum valid Credential length is 3.");
  }
  if (!password) {
    signInErrors.push("Password cannot be empty.");
  }
  if (password.length < 8) {
    signInErrors.push("Minimum valid password length is 8.");
  }
  return signInErrors;
};

const renderValidationErrors = (validationErrors) => {
  $("#error-title").html(" Invalid Inputs!");
  const formattedErrors = `
  <ul>
  ${validationErrors
    .map((error) => {
      return `
    <li>${error}</li>
    `;
    })
    .join(" ")}
  </ul>
  `;
  $("#error-text").html(formattedErrors);
  showErrorTooltip();
  setTimeout(() => {
    $("#error-title").html("");
    $("#error-text").html("");
  }, 4600);
};

const renderResponseError = (errorTitle, errorMsg) => {
  $("#error-title").html(" " + errorTitle);
  const formattedErrors = `<ul><li>${errorMsg}</li></ul>`;
  $("#error-text").html(formattedErrors);
  showErrorTooltip();
  setTimeout(() => {
    $("#error-title").html("");
    $("#error-text").html("");
  }, 4600);
};

const renderResponseSuccessMsg = (title, msg) => {
  $("#success-title").html(" " + title);
  const formattedErrors = `<ul><li>${msg}</li></ul>`;
  $("#success-text").html(formattedErrors);
  showSuccessTooltip();
  setTimeout(() => {
    $("#success-title").html("");
    $("#success-text").html("");
  }, 4600);
};

$(() => {
  renderAuthPage();
});

$("#signin-btn").on("click", async function () {
  try {
    const validationErrors = signInValidation();
    if (!!validationErrors.length) {
      return renderValidationErrors(validationErrors);
    }
    const loginData = {
      credentials: $("#login-credential").val() ?? null,
      password: $("#login-password").val() ?? null,
    };
    const loginResponse = await axios.post("/api/auth", loginData);
    $("#login-credential").val("");
    $("#login-password").val("");
    renderResponseSuccessMsg("Success", loginResponse.data.message);
    setTimeout(() => {
      location.href = `/dashboard?userId=${loginResponse.data.data._id}`;
    }, 1000);
    console.log(loginResponse);
  } catch (error) {
    renderResponseError(
      error?.response?.statusText,
      error?.response?.data?.message
    );
  }
});
