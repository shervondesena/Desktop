"use strict";

let UserBankList = [];

// Hàm debounce
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
const debouncedonSubmitWithdraw = debounce(onSubmitWithdraw, 1000);
$(document).ready(async () => {
    $(".zopmijz8rytdZWDDDhpNu").hide();
    $(".bankUserAddForm").hide();
    $(".withdrawForm").hide();

    getListBankWithdraw();
    await reloadBalance();
    await getListUserBank();
    $("#form-withdraw").on("submit", function (event) {
        event.preventDefault();
        debouncedonSubmitWithdraw(event) 
    });
    $("#userAddBankForm").on("submit", function (event) { onSubmitAddBank(event) });
    $("#amountWithdraw").keyup(function () { onChangedAmountTransaction($(this)) });
});

const getListBankWithdraw = () => {
    $.ajax({
        "url": `${mainApi}/api/payment/getListBankWithdraw`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
        },
    }).done((response) => {
        if (response.status) {
            const ListBankDeposit = response.data;
            for (const item of ListBankDeposit) {
                $('#bankProvideUserAdd').append(`
                    <option value="${item.code}">${item.code}/${item.name}</option>
                `);
            }
        } else {
            toastr.error(response.msg)
        }
    });
}

function onChangedAmountTransaction(input) {
    input.val(numberWithCommas(getOnlyNumberInString(input.val())));
}

function onSubmitWithdraw(event) { 
    // Dừng mọi hành động form mặc định
    event.preventDefault();

    // Gọi API luckymoney/check trước
    $.ajax({
        "url": `${mainApi}/api/luckymoney/check`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${bearerToken}`,
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Nếu kết quả trả về status là true, hiển thị modal và set amount
            if (response.status === true) {
                // Set số tiền vào phần tử có id là "set_amount_of_lucky"
                document.getElementById("set_amount_of_lucky").textContent = parseInt(response.amount / 1000).toLocaleString('vi-VN');

                // Hiển thị modalLucky bằng flex
                document.querySelector('.modalLucky').style.display = 'flex';

                // Dừng tại đây, không tiếp tục xử lý rút tiền
                return;
            } else {
                // Nếu không có đủ điều kiện nhận Lucky Money, tiếp tục xử lý rút tiền
                try {
                    let amountDeposit = getOnlyNumberInString($('#amountWithdraw').val());
                    const bankName = $('#bankName').val();
                    const bankNumber = $('#bankNumber').val();
                    const bankProvide = $('#bankProvide').val();
                    const passwd = $('#passwd').val();

                    if (!bankName || !bankNumber || !bankProvide || !passwd) {
                        toastr.warning('Vui lòng điền đầy đủ thông tin.');
                        return;
                    }

                    amountDeposit = Number(amountDeposit);

                    if (amountDeposit < 200000) {
                        toastr.warning('Số tiền rút tối thiểu là 200.000 VND!');
                        return;
                    }

                    // Gửi request rút tiền nếu đủ điều kiện
                    $.ajax({
                        "url": `${mainApi}/api/payment/createRequestWithdraw`,
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Authorization": `Bearer ${bearerToken}`,
                            "Content-Type": "application/json",
                        },
                        "data": JSON.stringify({
                            bankName,
                            bankNumber,
                            bankProvide,
                            amount: amountDeposit,
                            passwd
                        }),
                    }).done(function (response) {
                        if (response.status) {
                            toastr.success(response.msg);
                            location.reload(); 
                        } else {
                            toastr.warning(response.msg);
                        }
                    });
                } catch (e) {
                    console.log(e);
                    toastr.error('Đã có lỗi xảy ra! vui lòng thử lại!');
                }
            }
        },
        error: function (xhr, status, error) {
            console.error("Đã xảy ra lỗi: ", error);
        }
    });
}

function onSubmitAddBank(event) {
    /// stop all action form
    event.preventDefault();

    try {
        const bankName = $('#bankNameUserAdd').val();
        const bankNumber = $('#bankNumberUserAdd').val();
        const bankProvide = $('#bankProvideUserAdd').val();

        if (!bankName ||
            !bankNumber ||
            !bankProvide
        ) {
            toastr.warning('Vui lòng điền đầy đủ thông tin.')
            return;
        }

        if (bankNumber.length < 7) {
            toastr.warning('Số tài khoản không hợp lệ!')
            return;
        }

        $.ajax({
            "url": `${mainApi}/api/payment/userAddBank`,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
            },
            "data": JSON.stringify({
                bankProvide,
                bankName,
                bankNumber,
                bankBranch: "HA NOI"
            }),
        }).done(function (response) {
            if (response.status) {
                toastr.success(response.msg)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toastr.warning(response.msg)
            }
        });
    } catch (e) {
        console.log(e);
        toastr.error('Đã có lỗi xảy ra! vui lòng thử lại!')
    }
}

async function getListUserBank() {
    // getListUserBank
    return new Promise((resolve, reject) => {
        $.ajax({
            "url": `${mainApi}/api/payment/getListUserBank`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
            },
        }).done((response) => {
            if (response.status) {
                UserBankList = response.data;
                if (UserBankList.length > 0) {
                    $(".zopmijz8rytdZWDDDhpNu").hide();
                    $(".bankUserAddForm").hide();
                    $(".withdrawForm").show();


                    for (const item of UserBankList) {
                        $('#bankProvide').append(`
                            <option value="${item.bankProvide}">${item.bankProvide} / ${item.bankNumber}</option>
                        `);
                    }
                    const bankUser = UserBankList[0];
                    const bankName = $('#bankName').val(bankUser.bankName.toUpperCase());
                    const bankNumber = $('#bankNumber').val(bankUser.bankNumber);
                } else {
                    $(".zopmijz8rytdZWDDDhpNu").show();
                    $(".bankUserAddForm").show();
                    $(".withdrawForm").hide();
                }
            } else {
                toastr.error(response.msg)
            }
        });
        resolve();
        checkUserBank();
    });
}

function checkUserBank() {
    if (UserBankList.length > 0) {
        $(".zopmijz8rytdZWDDDhpNu").hide();
        $(".bankUserAddForm").hide();
        $(".withdrawForm").show();
    } else {
        $(".zopmijz8rytdZWDDDhpNu").show();
        $(".bankUserAddForm").show();
        $(".withdrawForm").hide();
    }
}

function reloadBalance() {
    return new Promise((resolve, reject) => {
        $.ajax({
            "url": `${mainApi}/api/auth/me`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
            },
        }).done((response) => {
            if (response.status) {
                const userData = response.user;
                $("#bankNameUserAdd").val(userData.name.toUpperCase());
                $("#amountWithdraw").val(numberWithCommas(userData.coin));
            } else {
                toastr.warning(response.msg)
            }
        });
        resolve();
    });
}