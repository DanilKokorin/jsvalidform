import intlTelInput from 'intl-tel-input';

$(function() {
    let mailValid = false;
    let phoneValid = false;
    let passwordValid = false;
    let reCaptcha = false;
    let confirmPasswordValid = false;
    let checkedValid = true;
    let phoneCoincidence = true;
    let mailCoincidence = true;

    $(function() {
        /*
         * International Telephone Input v16.0.0
         * https://github.com/jackocnr/intl-tel-input.git
         * Licensed under the MIT license
         */
        let inputPhoneNodes = document.querySelectorAll("input[name=phone]");

        for (let inputPhoneNode of inputPhoneNodes) {
            (() => {
                let iti = intlTelInput(inputPhoneNode, {
                    autoHideDialCode: false,
                    autoPlaceholder: "aggressive",
                    initialCountry: "auto",
                    separateDialCode: true,
                    preferredCountries: ['ru', 'us'],
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/..",
                    customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                        $(inputPhoneNode).data('selectedCountryPlaceholder', selectedCountryPlaceholder);
                        $(inputPhoneNode).trigger('countrychange');

                        return selectedCountryPlaceholder.replace(/\d/g, 'X');
                    },
                    geoIpLookup: function(callback) {
                        $.get('https://ipinfo.io', function() {}, "jsonp")
                            .always(function(resp) {
                                let countryCode = (resp && resp.country) ? resp.country : "ru";

                                callback(countryCode);
                            });
                    },
                });

                $(inputPhoneNode).data('iti', iti)
                    .data('selectedCountryPlaceholder', '');

                $(inputPhoneNode).on("countrychange", function() {
                    let selectedCountryPlaceholder = $(this).data('selectedCountryPlaceholder').replace(/\d/g, '9');

                    if (selectedCountryPlaceholder !== '') {
                        $(this).inputmask(selectedCountryPlaceholder, {
                            placeholder: "X",
                            clearMaskOnLostFocus: true,
                        });
                    }
                });

                $(inputPhoneNode).on("focusout", function() {
                    let intlNumber = $(this).data('iti').getNumber();
                });
            })(inputPhoneNode);
        }
    })

    $("input[name=phone]").on('keyup', function() {
        if ($(this).val() !== '') {
            if ($(this).val().match(/[A-z]/)) {
                phoneValid = false;
                $('#valid-phone').css('display', 'block');
            } else {
                phoneValid = true;
                $('#valid-phone').css('display', 'none');
            }
        } else {
            phoneValid = false;
            $('#valid-phone').css('display', 'block');
        }
    });

    $('#password').keyup(function() {
        // set password variable
        let pswd = $(this).val();

        let validLength = false;
        let validLetter = false;
        let validCapital = false;
        let validNumber = false;

        //validate the length
        if (pswd.length < 8 && pswd.length > 250) {
            $('#length').removeClass('valid').addClass('invalid');
            validLength = false;
        } else {
            $('#length').removeClass('invalid').addClass('valid');
            validLength = true;
        }
        //validate letter
        if (pswd.match(/[A-z]/)) {
            $('#letter').removeClass('invalid').addClass('valid');
            validLetter = true;
        } else {
            $('#letter').removeClass('valid').addClass('invalid');
            validLetter = false;
        }
        //validate capital letter
        if (pswd.match(/[A-Z]/)) {
            $('#capital').removeClass('invalid').addClass('valid');
            validCapital = true;
        } else {
            $('#capital').removeClass('valid').addClass('invalid');
            validCapital = false;
        }
        //validate number
        if (pswd.match(/[0-9]/)) {
            $('#number').removeClass('invalid').addClass('valid');
            validNumber = true;
        } else {
            $('#number').removeClass('valid').addClass('invalid');
            validNumber = false;
        }

        passwordValid = validNumber && validCapital && validLetter && validLength;

    }).on('focus', function() {
        $('#pswd_info').show();

    }).on('blur', function() {
        $('#pswd_info').hide();
    });

    let $pattern = /^((([0-9A-Za-z]{1}[A-Za-z0-9_\-\.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z0-9]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
    let $mail = $('#mail');

    $mail.on('keyup', function() {
        if ($(this).val() !== '') {
            if ($(this).val().search($pattern) == 0) {
                $('#valid').css('display', 'none');
                mailValid = true;
            } else {
                $('#valid').css('display', 'block');
                mailValid = false;
            }
        }
    });

    let $email = $('.valid__email1');
    let $validBtn = $('.valid-btn1');
    let $messageMailValid = $('.error--message1');

    $email.on('keyup', function() {
        if ($(this).val() !== '') {
            if ($(this).val().search($pattern) == 0) {
                $messageMailValid
                    .css('display', 'none');
                $validBtn
                    .css('opacity', '1')
                    .attr('disabled', false);

            } else {
                $messageMailValid
                    .css('display', 'block');
                $validBtn
                    .css('opacity', '0.7')
                    .attr('disabled', true);
            }
        }
    });

    let $email2 = $('.valid__email2');
    let $validBtn2 = $('.valid-btn2');
    let $messageMailValid2 = $('.error--message2');

    $email2.on('keyup', function() {
        if ($(this).val() !== '') {
            if ($(this).val().search($pattern) == 0) {
                $messageMailValid2
                    .css('display', 'none');
                $validBtn2
                    .css('opacity', '1')
                    .attr('disabled', false);

            } else {
                $messageMailValid2
                    .css('display', 'block');
                $validBtn2
                    .css('opacity', '0.7')
                    .attr('disabled', true);
            }
        }
    });

    let $email3 = $('.valid__email3');
    let $validBtn3 = $('.valid-btn3');
    let $messageMailValid3 = $('.error--message3');

    $email3.on('keyup', function() {
        if ($(this).val() !== '') {
            if ($(this).val().search($pattern) == 0) {
                $messageMailValid3
                    .css('display', 'none');
                $validBtn3
                    .css('opacity', '1')
                    .attr('disabled', false);

            } else {
                $messageMailValid3
                    .css('display', 'block');
                $validBtn3
                    .css('opacity', '0.7')
                    .attr('disabled', true);
            }
        }
    });

    window.onload = function() {
        $('#mail').val(
            new URLSearchParams(window.location.search).get('email')
        );
    };

    $(".password").on('keyup', function() {
        let password = $("#password").val();
        let confirmPassword = $("#confirm--password").val();

        if (password != confirmPassword) {
            $('.confirm--password__message').css('display', 'block');
            confirmPasswordValid = false;
        } else {
            $('.confirm--password__message').css('display', 'none');
            confirmPasswordValid = true;
        };
    });

    $('body').on('click', '.password-control', function() {
        if ($('.password').attr('type') == 'password') {
            $('.password-control').addClass('view');
            $('.password').attr('type', 'text');
        } else {
            $('.password-control').removeClass('view');
            $('.password').attr('type', 'password');
        }
        return false;
    });

    $('#card').on('change', function() {
        if ($('#card').prop('checked')) {
            checkedValid = true;
        } else {
            checkedValid = false;
        }
    });

    $('input').on('keyup', function() {
        if (mailValid && phoneValid && passwordValid && reCaptcha && confirmPasswordValid && checkedValid && phoneCoincidence && mailCoincidence) {
            $('#button1').attr('disabled', false);
            $('#button1').css({
                "opacity": "1"
            });
        } else {
            $('#button1').attr('disabled', true);
            $('#button1').css({
                "opacity": "0.6"
            });
        }
    });

    window.enableBtn = enableBtn;

    function enableBtn() {
        return new Promise(function(resolve, reject) {
            reCaptcha = true;
            if (mailValid && phoneValid && passwordValid && reCaptcha && confirmPasswordValid && checkedValid && phoneCoincidence && mailCoincidence) {
                $('#button1').attr('disabled', false);
                $('#button1').css({
                    "opacity": "1"
                });
            } else {
                $('#button1').attr('disabled', true);
                $('#button1').css({
                    "opacity": "0.6"
                });
            }
        });
    }

    window.enableButton = enableButton;

    function enableButton() {
        $('#button--log-in').attr('disabled', false);
        $('#button--log-in').css({
            "opacity": "1"
        });
    }

    $('.number_input').on('keyup', function(e) {
        let value = $(this).val();
        let len = value.length;
        let curTabIndex = parseInt($(this).attr('tabindex'));
        let nextTabIndex = curTabIndex + 1;
        let prevTabIndex = curTabIndex - 1;
        if (len >= 6) {
            $(this).val(value.substr(0, 6));
        }
        if (len >= 6) {
            $('#button2').attr('disabled', false);
            $('#button2').css({
                "opacity": "1"
            });
        } else {
            $('#button2').attr('disabled', true);
            $('#button2').css({
                "opacity": "0.6"
            });
        }
    });

    $(function() {
        let inputBox = document.getElementById("code");
        let invalidChars = [
            "-",
            "+",
            "e",
            "E",
        ];

        if (null !== inputBox) {
            inputBox.addEventListener("keydown", function(e) {
                if (invalidChars.includes(e.key)) {
                    e.preventDefault();
                }
            });
        }
    })

    $("#button1").on('click', function() {
        $('input[name="register_type"]').val(2);
        $(".sms-field").show();
        $("#button1").hide();
        $("#button2").show();

        timer();

        codeTwilio();

        $('#mail').attr("readonly", true);
        $('#phone').attr("readonly", true);
        $('#password').attr("readonly", true);
        $('#confirm--password').attr("readonly", true);
    });

    function timer() {
        let timerText = document.getElementById('timer-numbers').innerHTML;
        let parsed = Number.parseInt(timerText);
        let startTimer = setInterval(function() {
            parsed -= 1;
            document.getElementById('timer-numbers').innerHTML = parsed;
            if (parsed === 0) {
                clearInterval(startTimer);
                $("#button-code").show();
                $('.timer-code').hide();
            }
        }, 1000);

    }

    function getApiUrl() {
        let url = ''
        let domain = document.location.host
        let api = '/api/v1/'

        switch (domain) {
            case 'ecos.am':
            case 'system.ecos.am':

                url = 'https://cp.ecos.am' + api
                break;
                // case 'admin.sadrocky.ru':

                // url = 'https://cp.ecos.am' + api
                // break;
            default:

                url = 'http://' + 'localhost:8082' + api
                    // url = 'https://api.' + domain.replace("admin.", "") + api
                break;
        }
        return url
    }


    $("#mail").on('keyup', function() {
        sendStepTwo();
    });

    $("input[name=phone]").on('keyup', function() {
        sendStepThree();
    });

    $(".form--reg").on('submit', function(e) {
        e.preventDefault();
    });

    $("#button2").on('click', function() {
        checkPhoneCode();
        checkIn();
    });

    $("#sign-in-button").on('click', function() {
        $('input[name="register_type"]').val(3);
        $('#sign-in-button').attr('disabled', true);
        $('#sign-in-button').css({
            "opacity": "0.6"
        });
    });

    let deviceType;

    function trafficType() {

        if (screen.width > 576) {
            deviceType = 1;
        }
        if (screen.width < 576) {
            deviceType = 2;
        }
    }

    trafficType();

    function makeid(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    let ecosUid = makeid(18)
    document.cookie = "ecosUid=" + ecosUid;


    let step1 = {
        ecos_uid: ecosUid,
        step: 1
    };
    sendLog(step1);

    function sendStepTwo() {
        let step2 = {
            ecos_uid: ecosUid,
            email: $("#mail").val(),
            step: 2
        };
        checkMail(step2);
    }

    function sendStepThree() {
        let step3 = {
            ecos_uid: ecosUid,
            phone: getClearPhone(),
            step: 3
        };
        checkPhone(step3);
    }

    function codeTwilio() {
        let twilio = {
            ecos_uid: ecosUid,
            email: $("#mail").val(),
            phone: getClearPhone()
        };
        sendingCode(twilio);
    }

    function checkPhoneCode() {
        let verifyPhone = {
            ecos_uid: ecosUid,
            phone: getClearPhone(),
            phone_code: $(".sms-code").val()
        };
        verifyPhoneCode(verifyPhone);
    }

    function checkIn() {
        let phone = getClearPhone()
        let smsCode = $(".sms-code").val()
        let register = {
            // country_id: country,
            ecos_uid: ecosUid,
            email: $("#mail").val(),
            password: $("#password").val(),
            password_repeat: $("#confirm--password").val(),
            phone: phone.replaceAll(' ', '').replaceAll('-', ''),
            referral_code: getCookie('refCode'),
            register_type: $('input[name="register_type"]').val(),
            traffic_source: document.referrer,
            traffic_type_id: deviceType,
            phone_verification_code: smsCode,
            email_verification_code: smsCode,
            // a_pid: getCookie('a_pid') ? ? null,
            // a_oid: getCookie('a_oid') ? ? null,
            // a_cid: getCookie('a_cid') ? ? null,
        };
        signUp(register);
    }


    function sendLog(step1) {
        $.ajax({
            url: getApiUrl() + "auth/log",
            method: 'post',
            data: step1,
            dataType: 'json',
            error: function(xhr) {
                let err = eval("(" + xhr.responseText + ")");
                return xhr;
            },
            success: function(res) {
                return res;
            }
        })
    }

    function checkMail(step2) {
        $.ajax({
            url: getApiUrl() + 'user/check-email',
            method: 'post',
            data: step2,
            dataType: 'json',
            error: function(xhr) {
                let err = eval("(" + xhr.responseText + ")");
                return xhr;
            },
            success: function(res) {
                if ($("#mail").val() !== '') {
                    if (!res) {
                        $("#already-in-use-mail").css({
                            "display": "block"
                        });
                        mailCoincidence = false;
                    } else {
                        $("#already-in-use-mail").css({
                            "display": "none"
                        });
                        mailCoincidence = true;
                    }
                }
                return res;
            }
        })
    }

    function checkPhone(step3) {
        $.ajax({
            url: getApiUrl() + 'user/check-phone',
            method: 'post',
            data: step3,
            dataType: 'json',
            error: function(xhr) {
                let err = ECOS 
                cp.ecos.am
                eval("(" + xhr.responseText + ")");
                return xhr;
            },
            success: function(res) {
                if ($("#phone").val() !== '') {
                    if (!res) {
                        $("#already-in-use-phone").css({
                            "display": "block"
                        });
                        phoneCoincidence = false;
                    } else {
                        $("#already-in-use-phone").css({
                            "display": "none"
                        });
                        phoneCoincidence = true;
                    }
                }
                return res;
            }
        })
    }

    function sendingCode(twilio) {
        $.ajax({
            url: getApiUrl() + 'auth/twilio',
            method: 'post',
            data: twilio,
            dataType: 'json',
            error: function(xhr) {
                let err = eval("(" + xhr.responseText + ")");
                return xhr;
            },
            success: function(res) {
                return res;
            }
        })
    }

    function verifyPhoneCode(verifyPhone) {
        $.ajax({
            url: getApiUrl() + 'auth/verify-phone-code',
            method: 'post',
            data: verifyPhone,
            dataType: 'json',
            error: function(xhr) {
                let err = eval("(" + xhr.responseText + ")");
                return xhr;
            },
            success: function(res) {
                if (!res.response) {
                    $('#wrong--code').css({
                        "display": "block"
                    });
                } else {
                    $('#wrong--code').css({
                        "display": "none"
                    });

                }
                return res;
            }
        })
    }

    function signUp(register) {
        $.ajax({
            url: getApiUrl() + 'auth/signup',
            method: 'post',
            data: register,
            dataType: 'json',
            error: function(xhr) {
                let err = eval("(" + xhr.responseText + ")");
                return xhr;
            },
            success: function(res) {
                document.location.href = res.redirect_url;
                return res;
            }
        })
    }

    function getCookie(name) {

        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    function getClearPhone() {
        let phone = $(".iti__selected-dial-code").html() + $("input[name=phone]").val()
        return phone.replaceAll(' ', '').replaceAll('-', '')
    }
})