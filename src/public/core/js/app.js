"use strict";
let USER_ACTION_MENU_SHOW = false;

let APP_DOWNLOAD = {
  IOS: "https://www.vnplay69.com/account/withdraw",
  ANDROID: "https://www.vnplay69.com/account/deposit",
};

const LIST_URL_ENUM = {
  home: "/",
  slot: "/Lobby/Game",
  live: "/Lobby/Live",
  fish: "/Lobby/Fish",
  sport: "/Lobby/Sport",
  lottery: "/Lobby/Game",
  cock: "/Lobby/CockFighting",
  board: "/Lobby/Board",
  promotion: "/Promotion",
  download: "/Download",
  support: "/Support",
};
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

let debounceTimeout;

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "4000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
$(document).ready(function () {
  $("nav._4GFFQME3VxQOLaxRzBxeQ ul li").each(function (index) {
    if ($(this).attr("class") == "ng-scope") {
      addSubClick($(this).children("a").children("span"));
    }
  });
});

(function () {
  // CAPTCHA JS
  const fonts = ["cursive", "sans-serif", "serif", "monospace"];
  let captchaValue = "";
  function generateCatpcha() {
    let value = "";
    for (let i = 0; i < 4; i++) {
      value += Math.floor(Math.random() * 10);
    }
    captchaValue = value;
  }
  function setCaptcha() {
    let html = captchaValue
      .split("")
      .map((char) => {
        const rotate = -20 + Math.trunc(Math.random() * 30);
        const font = Math.trunc(Math.random() * fonts.length);
        return `<span style="
      transform: rotate(${rotate}deg);
      font-family: ${fonts[font]}
      ">${char}</span>`;
      })
      .join("");
    document.querySelector(".modal-login form .captcha .preview").innerHTML =
      html;
  }
  function initCaptcha() {
    document
      .querySelector(".modal-login form .captcha .captcha-refresh")
      .addEventListener("click", function () {
        generateCatpcha();
        setCaptcha();
      });
    generateCatpcha();
    setCaptcha();
  }
  initCaptcha();
  // Login Button Click Show
  $("._2mBNgBjbvImj-b_6WuwAFm").on("click", function () {
    initAuthModal(true, true);
  });
  // Login Button Click Hide
  $("._38xNbPhu8VneFOc5oh78Hr").on("click", function () {
    var isRegister = $(this).closest(".modal-register").length > 0;
    if (isRegister) {
      initAuthModal(false, false);
    } else {
      initAuthModal(true, false);
    }
  });
  // Register Button Click Show
  $(".ppUNnOlkVUpue-NNt6vxo").on("click", function () {
    initAuthModal(false, true);
  });
  // Register Button Click Hide
  $("._2ZxfNIqB8ZGUvf62lMlRii").on("click", function () {
    initAuthModal(false, false);
  });

  // Login In Register Modal Click
  $("._3eN8dYJXCF83-Dh1qe5MAc").on("click", function () {
    initAuthModal(true, true, true);
  });
  // Register In Login Modal Click
  $("._3bcYJCzylw0eAO3uq2kJMq").on("click", function () {
    initAuthModal(false, true, true);
  });
  const debouncedLoginPOST = debounce(loginPOST, 300);
  // Login Form btn click
  $("#loginForm").on("submit", function (event) {
    event.preventDefault();
    let inputCaptchaValue = document.querySelector(
      ".modal-login .captcha input",
    ).value;
    if (inputCaptchaValue === captchaValue) {
      debouncedLoginPOST(event);
    } else {
      toastr.warning("Mã xác minh không đúng !!");
      generateCatpcha();
      setCaptcha();
      return;
    }
  });
  // Resgiter Form btn click
  $("#registerForm").on("submit", function (event) {
    registerPOST(event);
  });

  // Close Modal Notify
  $(".ze8tEtJj_ZjnERvE_Rkerclose").on("click", function () {
    initAuthNotifyModal(false);
  });
  // add phone and email to form register
  $("#registerForm input#email").val(
    `guest000${RandomUserName(8).toLowerCase()}@gmail.com`,
  );
  //$('#registerForm input#phone').val(randomPhone());

  // nav menu
  $("._2pgWcte96LWeLJIJSxtBYd").on("click", function () {
    USER_ACTION_MENU_SHOW = USER_ACTION_MENU_SHOW == false ? true : false;
    if (USER_ACTION_MENU_SHOW) {
      $("._1_C5B74ifan6TN0Qu5DRDU").removeClass("ng-hide").addClass("ng-show");
    } else {
      $("._1_C5B74ifan6TN0Qu5DRDU").removeClass("ng-show").addClass("ng-hide");
    }
  });

  // game hot
  initGameRecommended();
  // dowwnload
  makeDiviceAppDownload();

  // Resgiter Form btn click
  $("#reloadBalanceBtn").on("click", function (event) {
    reloadBalance(event);
  });
})();

function addSubClick(element) {
  element.on("click", function (event) {
    let gameType = null;
    let gameCode = null;

    if ($(this).attr("data-game").includes(" Điện Tử")) {
      gameType = "Slot";
      gameCode = $(this).attr("data-game").split(" ")[0];
    } else if ($(this).attr("data-game").includes(" Trực Tuyến")) {
      gameType = "Live";
      gameCode = $(this).attr("data-game").split(" ")[0];
    } else if ($(this).attr("data-game").includes(" Thể Thao")) {
      gameType = "Sport";
      gameCode = $(this).attr("data-game").split(" ")[0];
    } else if ($(this).attr("data-game").includes(" Xổ Số")) {
      gameType = "Lottery";
      gameCode = $(this).attr("data-game").split(" ")[0];
    } else if ($(this).attr("data-game").includes(" Đá Gà")) {
      gameType = "CockFighting";
      gameCode = $(this).attr("data-game").split(" ")[0];
    } else if ($(this).attr("data-game").includes(" Game Bài")) {
      gameType = "Board";
      gameCode = $(this).attr("data-game").split(" ")[0];
    }

    // open game
    createGameWindow(gameType, gameCode);

    // stop all propagation
    event.stopPropagation();
  });
}

function createGameWindow(gameType, gameProduct) {
  // Các sảnh game đang bảo trì
  const maintenanceGameTypes = ["Slot", "Fish", "Board", "CockFighting", "Lottery"];
  if (maintenanceGameTypes.includes(gameType)) {
    toastr.info("Sảnh game đang bảo trì");
    return;
  }

  if (gameType == "Live") {
    let product = null;
    let code = null;

    switch (gameProduct) {
      case "SE":
        product = "SEX";
        code = "LC";
        break;
      case "SA":
        product = "TEST";
        code = "LC";
        break;
      case "EG":
        product = "EG";
        code = "LC";
        break;
      case "TP":
        product = "TEST";
        code = "LC";
        break;
      case "BG":
        product = "BG";
        code = "LC";
        break;
      case "MG":
        product = "TEST";
        code = "LC";
        break;
      case "PP":
        product = "TEST";
        code = "LC";
        break;
      case "DB":
        product = "TEST";
        code = "LC";
        break;
      case "PT":
        product = "TEST";
        code = "LC";
        break;
      case "DG":
        product = "DG";
        code = "LC";
        break;
      case "WM":
        product = "WM";
        code = "LC";
        break;
      case "AG":
        product = "TEST";
        code = "LC";
        break;
      case "PA":
        product = "TEST";
        code = "LC";
        break;
      case "VIA":
        product = "TEST";
        code = "LC";
        break;
      case "IDN":
        product = "TEST";
        code = "LC";
        break;
    }

    if (product && code) launchGame(product, code);
  } else if (gameType == "Sport") {
    let product = null;
    let code = null;

    switch (gameProduct) {
      case "SABA":
        product = "TEST";
        code = "SB";
        break;
      case "CR":
        product = "TEST";
        code = "SB";
        break;
      case "CMD":
        product = "TEST";
        code = "SB";
        break;
      case "UG":
        product = "TEST";
        code = "SB";
        break;
      case "IM":
        product = "TEST";
        code = "SB";
        break;
      case "SBO":
        product = "SBO";
        code = "SB";
        break;
    }

    if (product && code) launchGame(product, code);
  } else if (gameType == "Lottery") {
    let product = null;
    let code = null;

    switch (gameProduct) {
      case "TP":
        break;
      case "VR":
        break;
    }
    if (product && code) launchGame(product, code);
  } else if (gameType == "CockFighting") {
    let product = null;
    let code = null;

    switch (gameProduct) {
      case "WS168":
        product = "WS168";
        code = "WS1682";
        break;
    }
    if (product && code) launchGame(product, code);
  } else if (gameType == "Board") {
    let product = null;
    let code = null;

    if (gameProduct == "JL") {
      window.open(
        "/Redirect?url=" + utoa("/Lobby/Board/" + gameProduct),
        "popUpWindow",
        "height=800,width=1000,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
      );
    } else {
      switch (gameProduct) {
        case "PP0165":
          product = "PP";
          code = "PP0165";
          break;
        case "PP0166":
          product = "PP";
          code = "PP0166";
          break;
        case "PP0228":
          product = "PP";
          code = "PP0228";
          break;
        case "PP0183":
          product = "PP";
          code = "PP0183";
          break;
        case "PP0213":
          product = "PP";
          code = "PP0213";
          break;
        case "PP0238":
          product = "PP";
          code = "PP0238";
          break;
        case "PP0210":
          product = "PP";
          code = "PP0210";
          break;
        case "PP0135":
          product = "PP";
          code = "PP0135";
          break;
        case "PP0315":
          product = "PP";
          code = "PP0315";
          break;
        case "PP0739":
          product = "PP";
          code = "PP0739";
          break;
        case "PP0253":
          product = "PP";
          code = "PP0253";
          break;
      }
      if (product && code) launchGame(product, code);
    }
  }
}

function initGameRecommended() {
  if ($("._3ppcwOkSyQWl-WAP_h_oej").length) {
    const GAME_CODE = "R88";
    $.ajax({
      url: `${mainApi}/api/product/${GAME_CODE}/RNG`,
      headers: { "Content-Type": "application/json" },
      type: "get",
      dataType: "json",
      success: function (result) {
        if (result.status) {
          const gameList = result.data.games;
          if (gameList.length > 0) {
            shuffle(gameList);
            // add tab game recommed
            for (let i = 0; i < 10; i++) {
              $("#propose").append(`
                                <li ng-repeat="game class="ng-scope" onclick="launchGame('${gameList[i].productCode}', '${gameList[i].tcgGameCode}')" style="">
                                    <img src="${gameList[i].icon}">
                                    <div class="ng-binding _3BWGcllC2hbMA9nLJl5G7Y">${gameList[i].gameName}</div>
                                    <i></i>
                                </li>
                            `);
            }

            // add tab game hot
            for (let i = 10; i < 20; i++) {
              $("#hot").append(`
                            <li ng-repeat="game class="ng-scope" onclick="launchGame('${gameList[i].productCode}', '${gameList[i].tcgGameCode}')" style="">
                                <img src="${gameList[i].icon}">
                                <div class="ng-binding _3BWGcllC2hbMA9nLJl5G7Y">${gameList[i].gameName}</div>
                                <i></i>
                            </li>
                        `);
            }
          }
        }
      },
    });
  }
}
// CHUYEN QUY V2
function launchGame(gameProduct, gameCode) {
  const product = gameProduct;
  let type = gameCode;

  if (!isLogin) {
    toastr.warning("Vui lòng đăng nhập trước khi khởi chạy trò chơi!");
    return;
  }

  // Kiểm tra sảnh game có hoạt động không
  const activeProducts = ["SEX", "EG", "BG", "DG", "WM", "SBO"];
  if (!activeProducts.includes(product)) {
    toastr.info("Sảnh game đang bảo trì");
    return;
  }

  // Xay dung modal chuyen quy ngay tai day
  const modalHtml = `
    <div class="game-transfer-wallet-modal-v2 undefined open">
    <div class="game-transfer-wallet-modal-v2__main">
      <div class="game-transfer-wallet-modal-v2__header">
        <div class="game-transfer-wallet-modal-v2__title">Nạp tự động
          <button class="game-transfer-wallet-modal-v2__close">X
          </button>
        </div>
      </div>
      <div class="game-transfer-wallet-modal-v2__content">
        <div class="game-transfer-wallet-modal-v2__item"><span>Ví chính</span>
          <div><span class="game-transfer-wallet-modal-v2__item-amount">0 K</span><button>Nạp hết</button></div>
        </div>
        <div class="game-transfer-wallet-modal-v2__item"><span class="game-transfer-wallet-modal-v2__wallet-title" color="danger">${product}</span>
          <div><span class="game-transfer-wallet-modal-v2__item-amount">0 K</span><button>Rút hết</button></div>
        </div>
        <div class="game-transfer-wallet-modal-v2__item"><span>Số tiền (VND)</span>
          <div>
          <input type="number" name="amount" placeholder="Nhập số tiền" value="0" min="0" step="1">
          <button id="game-transfer-wallet-optional">Nạp tiền</button>
          </div>
        </div>
      </div>
      <div class="game-transfer-wallet-modal-v2__footer">
        <button color="danger">Vào game</button>
        <button style="display: none" color="danger">Nạp hết &amp; Vào game</button>
      </div>
    </div>
  </div>
    `;
  // Thêm sự kiện click vào phần tử .game-transfer-wallet-modal-container
  $("#game-transfer-wallet-modal-container").html(modalHtml);

  // Sự kiện để đóng modal khi nhấn vào nút HỦY
  $("#game-transfer-wallet-modal-container").on(
    "click",
    ".game-transfer-wallet-modal-v2__close",
    function () {
      $("#game-transfer-wallet-modal-container").empty();
    },
  );

  // Call getWalletV2 with the gameID (which is the same as the product)
  getWalletV2(product);
  // Call balance of user
  reloadBalanceV2();

  let allCashInOutTimeout1;
  let allCashInOutTimeout2;
  let cashInOptionalTimeout;

  // all cast in
  $(".game-transfer-wallet-modal-v2__item")
    .eq(0)
    .find("button")
    .on("click", function () {
      const button = $(this);
      // Vô hiệu hóa nút
      button.prop("disabled", true);

      if (allCashInOutTimeout1) {
        clearTimeout(allCashInOutTimeout1);
      }

      allCashInOutTimeout1 = setTimeout(function () {
        submitAllCashInOut(product, 0);
      }, 300); // Chờ 300ms trước khi gọi hàm
    });
  // all cast out
  $(".game-transfer-wallet-modal-v2__item")
    .eq(1)
    .find("button")
    .on("click", function () {
      const button = $(this);
      // Vô hiệu hóa nút
      button.prop("disabled", true);

      if (allCashInOutTimeout2) {
        clearTimeout(allCashInOutTimeout2);
      }

      allCashInOutTimeout2 = setTimeout(function () {
        submitAllCashInOut(product, 1);
      }, 300); // Chờ 300ms trước khi gọi hàm
    });
  // cast in optional
  $("#game-transfer-wallet-optional").on("click", function () {
    // Lấy giá trị từ ô input
    const amount = $('input[name="amount"]').val();
    // Kiểm tra xem giá trị nhập vào có hợp lệ không
    if (isNaN(amount) || amount <= 0) {
      // Hiển thị thông báo lỗi nếu giá trị không hợp lệ
      toastr.warning("Vui lòng nhập số tiền hợp lệ.");
      return;
    } else {
      // Vô hiệu hóa nút #game-transfer-wallet-optional
      $("#game-transfer-wallet-optional").prop("disabled", true);

      if (cashInOptionalTimeout) {
        clearTimeout(cashInOptionalTimeout);
      }

      cashInOptionalTimeout = setTimeout(function () {
        submitCashInOptional(product, amount);
      }, 300); // Chờ 300ms trước khi gọi hàm
    }
  });

  // start game
  $(".game-transfer-wallet-modal-v2__footer")
    .eq(0)
    .find("button")
    .on("click", function () {
      startGame(product, type);
    });
}
function startGame(product, type) {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
  const deviceType = isMobile ? "mobile" : "desktop";
  let winRef;

  // Mở cửa sổ mới nếu là thiết bị di động
  if (isMobile) {
    winRef = window.open();
  }

  fetch(
    `${mainApi}/api/game/launchgame/${product.toUpperCase()}?type=${type}&device=${deviceType}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    },
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.status) {
        const playUrl = "/Redirect?url=" + utoa(result.data.playUrl);

        // Đặt URL cho cửa sổ mới mở nếu là thiết bị di động
        if (isMobile) {
          winRef.location = playUrl;
        } else {
          // Mở URL trong tab mới nếu không phải là thiết bị di động
          const anchor = document.createElement("a");
          anchor.href = playUrl;
          anchor.target = "_blank";
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        }

        // Xóa nội dung của modal
        $("#game-transfer-wallet-modal-container").empty();
      } else {
        // Hiển thị thông báo lỗi nếu API trả về lỗi
        toastr.error(result.msg);
      }
    })
    .catch((error) => {
      console.error("Error launching game:", error);
      // Hiển thị thông báo lỗi nếu có lỗi trong quá trình gọi API
      toastr.error("Không thể khởi chạy trò chơi. Vui lòng thử lại sau.");
    });
}

function reloadBalanceV2() {
  try {
    $.ajax({
      url: `${mainApi}/api/auth/me`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      type: "get",
      dataType: "json",
      success: function (result) {
        if (result.status) {
          const meData = result.user;
          const readableCoin = Math.round(meData.coin / 1000);
          $(".game-transfer-wallet-modal-v2__item-amount")
            .first()
            .text(`${numberWithCommas(readableCoin)} K`);
        } else {
          toastr.warning("Phiên đăng nhập hết hiệu lực!");
        }
      },
    });
  } catch (e) {
    console.log(e);
    toastr.error("Có lỗi xảy ra, vui lòng thử lại!");
  }
}

const getWalletV2 = (gameID) => {
  $.ajax({
    url: `${mainApi}/api/game/wallets/${gameID.toUpperCase()}`,
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  })
    .done((response) => {
      if (response.status) {
        $(".game-transfer-wallet-modal-v2__item-amount")
          .eq(1)
          .text(`${response.balance / 1000} K`);
      } else {
        console.error("Failed to retrieve balance");
      }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.error("AJAX call failed: ", textStatus, errorThrown);
    });
};

function submitAllCashInOut(gameID, transferType) {
  let currentAmount = 0;

  // Function to handle submitting cash in after getting user data
  const handleCashIn = function () {
    // Kiểm tra xem số tiền hiện tại có hợp lệ không
    if (currentAmount < 1000) {
      toastr.info("Số tiền phải lớn hơn 1000 VND.");
      return;
    }

    try {
      // Gọi API để chuyen quy / rut quy
      $.ajax({
        url: `${mainApi}/api/game/wallet-transfer`,
        method: "POST",
        timeout: 0,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          amount: Number(currentAmount),
          id: gameID,
          transferType: 0,
        }),
      }).done(function (response) {
        if (response.status) {
          reloadBalanceV2();
          getWalletV2(gameID);
        } else {
          toastr.warning(response.msg);
        }
      });
    } catch (e) {
      console.log(e);
      toastr.error("Có lỗi xảy ra vui lòng thử lại.");
    }
  };

  const handleCashOut = function () {
    // Kiểm tra xem số tiền hiện tại có hợp lệ không
    if (currentAmount < 1) {
      toastr.info("Số tiền phải lớn hơn 1K.");
      return;
    }

    try {
      // Gọi API để chuyen quy / rut quy
      $.ajax({
        url: `${mainApi}/api/game/wallet-transfer`,
        method: "POST",
        timeout: 0,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          amount: Number(currentAmount / 1000),
          id: gameID,
          transferType: 1,
        }),
      }).done(function (response) {
        if (response.status) {
          reloadBalanceV2();
          getWalletV2(gameID);
        } else {
          toastr.warning(response.msg);
        }
      });
    } catch (e) {
      console.log(e);
      toastr.error("Có lỗi xảy ra vui lòng thử lại.");
    }
  };

  if (transferType == 0) {
    // Gọi API để lấy dữ liệu người dùng
    $.ajax({
      url: `${mainApi}/api/auth/me`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      type: "get",
      dataType: "json",
      success: function (result) {
        if (result.status) {
          const meData = result.user;
          currentAmount = meData.coin;
          // Gọi hàm xử lý chuyển tiền sau khi nhận dữ liệu người dùng
          handleCashIn();
        } else {
          toastr.warning("Phiên đăng nhập hết hiệu lực!");
        }
      },
    });
  }
  if (transferType == 1) {
    $.ajax({
      url: `${mainApi}/api/game/wallets/${gameID.toUpperCase()}`,
      method: "GET",
      timeout: 0,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    })
      .done((response) => {
        if (response.status) {
          currentAmount = response.balance;
          handleCashOut();
        } else {
          console.error("Failed to retrieve balance");
        }
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.error("AJAX call failed: ", textStatus, errorThrown);
      });
  }
}
function submitCashInOptional(gameID, numericAmount) {
  let currentAmount = 0;

  // Function to handle submitting cash in after getting user data
  const handleCashIn = function () {
    // Kiểm tra xem số tiền hiện tại có hợp lệ không
    if (currentAmount < 1000) {
      toastr.info("Số tiền phải lớn hơn 1000 VND.");
      return;
    }
    if (numericAmount > currentAmount) {
      toastr.info("Số tiền không hợp lệ.");
      return;
    }

    try {
      // Gọi API để chuyen quy
      $.ajax({
        url: `${mainApi}/api/game/wallet-transfer`,
        method: "POST",
        timeout: 0,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          amount: Number(numericAmount),
          id: gameID,
          transferType: 0,
        }),
      }).done(function (response) {
        if (response.status) {
          reloadBalanceV2();
          getWalletV2(gameID);
          $('input[name="amount"]').val("0");
        } else {
          toastr.warning(response.msg);
        }
      });
    } catch (e) {
      console.log(e);
      toastr.error("Có lỗi xảy ra vui lòng thử lại.");
    }
  };

  // Gọi API để lấy dữ liệu người dùng
  $.ajax({
    url: `${mainApi}/api/auth/me`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    type: "get",
    dataType: "json",
    success: function (result) {
      if (result.status) {
        const meData = result.user;
        currentAmount = meData.coin;
        console.log("meData.coin", meData.coin);
        handleCashIn();
      } else {
        toastr.warning("Phiên đăng nhập hết hiệu lực!");
      }
    },
  });
}

// END CHUYEN QUY V2

function getCaptcha() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `${mainApi}/api/captcha`,
      method: "GET",
      timeout: 0,
      headers: { "Content-Type": "application/json" },
    }).done(function (response) {
      if (response.status) {
        resolve(response.captcha);
      } else {
        resolve("");
      }
    });
  });
}

async function initCaptcha(captchaSrcId) {
  const captcha = await getCaptcha();
  $("#" + captchaSrcId).attr("src", captcha);
}

function showBackdropModal(status) {
  if (status) $(".modal-backdrop").show();
  if (!status) $(".modal-backdrop").hide();
}

function initAuthModal(type, status, dump = false) {
  if (dump) {
    $(".modal-login").hide();
    $(".modal-register").hide();
  }

  if (type) {
    // login
    if (status) {
      showBackdropModal(true);
      $(".modal-login").css("left", "-50%"); // Bắt đầu từ bên trái màn hình
      $(".modal-login").show();
      $(".modal-login").animate({ left: "0" }, 200, () => {}); // Di chuyển vào giữa màn hình
    } else {
      $(".modal-login").fadeOut();
      showBackdropModal(false);
    }
  } else {
    // register
    if (status) {
      showBackdropModal(true);
      $(".modal-register").css("left", "-50%");
      $(".modal-register").show();
      $(".modal-register").animate({ left: "0" }, 200, () => {});
    } else {
      $(".modal-register").fadeOut();
      showBackdropModal(false);
    }
  }
}

function initAuthNotifyModal(status, title = "", message = "") {
  if (status) {
    $(".ze8tEtJj_ZjnERvE_Rkertitle").html(title);
    $(".ze8tEtJj_ZjnERvE_Rkercontent").html(message);
    $("._1M8UeeUNQsZy4H6GAA2notify")
      .css({
        "z-index": "10000",
        top: "-222px",
      })
      .show()
      .animate({ top: "0px" }, 100);
  } else {
    $("._1M8UeeUNQsZy4H6GAA2notify").animate(
      { top: "-222px" },
      200,
      function () {
        $("._1M8UeeUNQsZy4H6GAA2notify").fadeOut();
      },
    );
  }
}

function loginPOST(element) {
  /// stop all action form
  element.preventDefault();
  try {
    const username = $("#loginForm input#username").val();
    const password = $("#loginForm input#password").val();
    // const captcha = $('#loginForm input#captcha').val();
    if (!username || !password) {
      toastr.warning("Vui lòng điền đầy đủ thông tin");
      return;
    }
    $.ajax({
      url: "/auth/login",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        username: username,
        password: password,
        captcha: "123",
      }),
    }).done(function (response) {
      if (response.status) {
        toastr.success("Đăng nhập thành công");
        setTimeout(() => {
          window.location = "/";
        }, 200);
      } else {
        toastr.error(response.msg);
      }
    });
  } catch (e) {
    console.log(e);
    toastr.error("Có lỗi xảy ra, vui lòng thử lại!");
  }
}

function registerPOST(element) {
  /// stop all action form
  console.log("");
  element.preventDefault();
  // Nếu debounceTimeout đã được thiết lập, không thực hiện tiếp
  if (debounceTimeout) {
    return;
  }

  // Thiết lập thời gian debounce (ví dụ: 1000ms)
  debounceTimeout = setTimeout(() => {
    debounceTimeout = null; // Đặt lại timeout sau khi thực hiện
  }, 1000);
  try {
    if (
      !$("#registerForm input#username").val() ||
      !$("#registerForm input#password").val() ||
      !$("#registerForm input#password_cf").val() ||
      !$("#registerForm input#name").val() ||
      !$("#registerForm input#phone").val()
    ) {
      toastr.warning("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const testUsername = new RegExp("^[a-zA-Z0-9]+$");
    const testName = new RegExp('^[a-zA-Z s.!?"-]+$');
    const testEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    // validate input type
    if (!testUsername.test($("#registerForm input#username").val())) {
      toastr.warning("Tên tài khoản không hợp lệ!");
      return;
    }
    if (!testName.test($("#registerForm input#name").val())) {
      toastr.warning("Họ và tên không hợp lệ!");
      return;
    }

    // validate string length
    if (
      $("#registerForm input#username").val().length < 5 ||
      $("#registerForm input#username").val().length > 20
    ) {
      toastr.warning("Tên tài khoản không được nhỏ hơn 5 và lớn hơn 20 ký tự!");
      return;
    }
    if (
      $("#registerForm input#name").val().length <= 5 ||
      $("#registerForm input#name").val().length > 50
    ) {
      toastr.warning("Họ và tên không được nhỏ hơn 5 và lớn hơn 50 ký tự!");
      return;
    }

    if (
      $("#registerForm input#phone").val().length < 9 ||
      $("#registerForm input#phone").val().length > 15
    ) {
      toastr.warning("Số điện thoại không hợp lệ!");
      return;
    }
    if (
      $("#registerForm input#password").val().length < 5 ||
      $("#registerForm input#password").val().length > 30
    ) {
      toastr.warning("Mật khẩu không được nhỏ hơn 8 và lớn hơn 20 ký tự");
      return;
    }
    if (
      $("#registerForm input#password").val() !==
      $("#registerForm input#password_cf").val()
    ) {
      toastr.warning("2 mật khẩu không trùng khớp!");
      return;
    }
    $.ajax({
      url: "/auth/register",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: $("#registerForm input#name").val(),
        username: $("#registerForm input#username").val(),
        refcode: !$("#registerForm input#refcode").val()
          ? null
          : $("#registerForm input#refcode").val(),
        email: $("#registerForm input#username").val() + "@gmail.com",
        phone: $("#registerForm input#phone").val(),
        password: $("#registerForm input#password").val(),
      }),
    }).done(function (response) {
      if (response.status) {
        setTimeout(() => {
          window.location = "/";
        }, 200);
      } else {
        toastr.warning(response.msg);
      }
    });
  } catch (e) {
    console.log(e);
    toastr.error("Có lỗi xảy ra, vui lòng thử lại!");
  }
}

function reloadBalance(element) {
  $("span#reloadBalanceBtn").html(`<i class="fa fa-refresh fa-spin"></i>`);
  try {
    $.ajax({
      url: `${mainApi}/api/auth/me`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      type: "get",
      dataType: "json",
      success: function (result) {
        if (result.status) {
          const meData = result.user;
          setTimeout(() => {
            $("p.header-balance").text(
              numberWithCommas(meData.coin / 1000) + " K",
            );
            $("span#reloadBalanceBtn").html(`<i class="fa fa-refresh"></i>`);
          }, 1000);
        } else {
          toastr.warning("Phiên đăng nhập hết hiệu lực!");
        }
      },
    });
  } catch (e) {
    console.log(e);
    toastr.error("Có lỗi xảy ra, vui lòng thử lại!");
  }
}

function makeDiviceAppDownload() {
  $("#app-download-android").attr("href", APP_DOWNLOAD.ANDROID);
  $("#app-download-ios").attr("href", APP_DOWNLOAD.IOS);
}

function initClock() {
  //Khởi tạo đối tượng timer sử dụng Date Object
  var timer = new Date();
  var hour = timer.getHours(); //Lấy giờ hiện tại (giá trị từ 0 - 23)
  var minute = timer.getMinutes(); //Lấy phút hiện tại
  var second = timer.getSeconds(); //Lấy giây  hiện tại
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  const timeCurrent = hour + ":" + minute + ":" + second;
  const dateCurrent = `${moment().format("YYYY/MM/DD")} (T${moment().day()})`;
  $("._1V92G6pCR9QlefaMtJzebU").html(`${dateCurrent} ${timeCurrent}`);
}

//Thực hiện hàm clock theo chu kỳ 1 giây
setInterval("initClock()", 1000);

// LOGOUT
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("popupClosed");
    window.location.href = "/auth/logout";
  });
});
