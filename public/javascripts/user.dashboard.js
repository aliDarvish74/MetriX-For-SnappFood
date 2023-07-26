function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}
$(window).on("resize", function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(function () {
    test();
  });
});

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
const renderResponseError = (
  errorTitle = "Error",
  errorMsg = "Something went wrong."
) => {
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

const renderNavBar = (userId, role) => {
  const navbar = document.getElementById("navbar-items");
  navbar.innerHTML = `
   <div class="hori-selector">
            <div class="left"></div>
            <div class="right"></div>
          </div>
    ${
      role === "Agent"
        ? `<li class="nav-item">
            <a class="nav-link" onclick="renderMyPerformance('${userId}')" href="javascript:void(0);"
             ><i class="bi bi-card-text"></i>My Performance</a
            >
           </li>`
        : `<li class="nav-item">
            <a class="nav-link" onclick="renderAgentsPerformance('${userId}')" href="javascript:void(0);"
             ><i class="bi bi-card-text"></i>Agents Performance</a
            >
           </li>`
    }
   
   <li class="nav-item active">
    <a class="nav-link" href="javascript:void(0);" onclick="renderPersonalInfo('${userId}')"
     ><i class="bi bi-speedometer2"></i>Personal Info</a
    >
   </li>
  `;
  navbar.parentElement.innerHTML =
    navbar.parentElement.innerHTML +
    `
  <a
          onclick="userSignout()"
          class="btn btn-secondary rounded-4 ms-3"
          type="button"
          id="signoutBtn"
        >
          Sign Out <i class="bi bi-door-open"></i>
        </a>
        <div id="user-avatar-container" class="ms-2 me-2">
          <img
            src="/images/avatars/user-default-avatar.png"
            class="rounded-circle border border-2 border-light"
            width="44px"
            alt=""
            onclick=""
            style="cursor: pointer"
          />
        </div>
  `;
  setTimeout(function () {
    test();
  });
  var path = window.location.pathname.split("/").pop();

  // Account for home page with empty path
  if (path == "") {
    path = "index.html";
  }

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  // Add active class to target link
  target.parent().addClass("active");
};
const userSignout = async () => {
  try {
    await axios.get("/api/auth");
    renderResponseSuccessMsg("Success", "Signed out successfully");
    setTimeout(() => {
      location.pathname = "auth";
    }, 1000);
  } catch (error) {
    return renderResponseError(
      error?.response?.data?.status,
      error?.response?.data?.message
    );
  }
};

const renderPersonalInfo = async (userId) => {
  try {
    const personalInfoContainer = document.getElementById(
      "blogger-info-detail"
    );
    const { data } = await axios.get(`/api/user/${userId}`);
    const user = data.data;
    personalInfoContainer.innerHTML = `
          <div class="col-4 p-3 text-light">
            <span class="text-warning">Full Name:<span class="text-light"> ${
              user.fullname
            }</span></span>
            </div>
          <div class="col-4 p-3 text-light">
          <span class="text-warning">Email Adress: <span class="text-light">${
            user.email
          }</span></span>
          </div>
          <div class="col-4 p-3 text-light">
          <span class="text-warning">Hire Date: <span class="text-light">${
            user.hireDate
          }</span></span>
          </div>
          <div class="col-4 p-3 text-light">
            <span class="text-warning">Voip Number:  <span class="text-light">${
              user.voip
            }</span></span>
            </div>
            <div class="col-4 p-3 text-light">
            <span class="text-warning">Task:  <span class="text-light">${
              user.task
            }</span></span>
          </div>
          <div class="col-4 p-3 text-light">
            <span class="text-warning">Birth Date:  <span class="text-light">${
              user.birthDate
            }</span></span>
          </div>
          <div class="col-4 p-3 text-light">
            <span class="text-warning">Shift:  <span class="text-light">${
              user.shift.start
            } - ${user.shift.end}</span></span>
          </div>
          <div class="col-4 p-3 text-light">
            <span class="text-warning">Off Group:  <span class="text-light">${
              user.offGroup
            }</span></span>
          </div>
          <div class="col-4 p-3 text-light">
            <span class="text-warning">National Code:  <span class="text-light">${
              user.nationalCode
            }</span></span>
            </div>
            <div class="col-4 p-3 text-light">
            <span class="text-warning">Phone Number:  <span class="text-light">${
              user.phoneNumber
            }</span></span>
            </div>
            <div class="col-4 p-3 text-light">
            <span class="text-warning">Rest Time:  <span class="text-light">${
              user.restTime
            }</span></span>
            </div>
            <div class="col-4 p-3 text-light">
            <span class="text-warning">Role:  <span class="text-light">${
              user.role
            }</span></span>
            </div>
            <div class="col-4 p-3 text-light">
            <span class="text-warning">Direct Manager:  <span class="text-light">${
              user.directManager.fullname ?? "مشخص نشده"
            }</span></span>
            </div>
            `;
  } catch (error) {
    console.log(error);
    renderResponseError(
      error?.response?.statusText,
      error?.response?.data?.message
    );
  }
};
const renderMyPerformance = (userId) => {
  console.log(userId, "my performance");
};
const renderAgentsPerformance = (userId) => {
  console.log(userId, "my agents performance");
};

window.addEventListener("load", async (e) => {
  try {
    const userId = location.search.replace("?userId=", "");
    const { data } = await axios.get(`/api/user/${userId}`);
    const user = data.data;
    renderNavBar(user._id, user.role);
    renderPersonalInfo(userId);
    setTimeout(() => {
      test();
    }, 250);
  } catch (error) {
    console.log(error);
    renderResponseError(
      error?.response?.statusText,
      error?.response?.data?.message
    );
  }
});
