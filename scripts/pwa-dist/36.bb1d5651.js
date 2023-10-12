/*! @version pwa-studio: 1.0.0, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.10, @magento/pwa-theme-venia: ^1.3.0, @magento/pwa-buildpack: ~11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/experience-platform-connector: ^1.0.5, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.7.12 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{V2XY:function(e,r,a){"use strict"
a.r(r),a.d(r,"default",function(){return t})
var t={payButton:"결제","payButton.redirecting":"리디렉션 중...","payButton.with":"%{maskedData}(으)로 %{value} 결제",close:"닫기",storeDetails:"다음 결제를 위해 이 수단 저장","creditCard.holderName":"카드상의 이름","creditCard.holderName.placeholder":"J. Smith","creditCard.holderName.invalid":"카드에 표시된 대로 이름을 입력합니다.","creditCard.numberField.title":"카드 번호","creditCard.numberField.placeholder":"1234 5678 9012 3456","creditCard.expiryDateField.title":"만료일","creditCard.expiryDateField.placeholder":"MM/YY","creditCard.expiryDateField.month":"월","creditCard.expiryDateField.month.placeholder":"MM","creditCard.expiryDateField.year.placeholder":"YY","creditCard.expiryDateField.year":"연도","creditCard.cvcField.title":"보안 코드","creditCard.cvcField.placeholder":"123","creditCard.storeDetailsButton":"다음을 위해 저장","creditCard.cvcField.placeholder.4digits":"4자리","creditCard.cvcField.placeholder.3digits":"3자리","creditCard.taxNumber.placeholder":"YYMMDD / 0123456789",installments:"할부 개월 수",installmentOption:"%{times}x %{partialValue}",installmentOptionMonths:"%{times}개월","installments.oneTime":"일시불 결제","installments.installments":"할부 결제","installments.revolving":"리볼빙 결제","sepaDirectDebit.ibanField.invalid":"유효하지 않은 계좌 번호","sepaDirectDebit.nameField.placeholder":"J. Smith","sepa.ownerName":"소유자 이름","sepa.ibanNumber":"계좌 번호(IBAN)","error.title":"오류","error.subtitle.redirect":"리디렉션 실패","error.subtitle.payment":"결제 실패","error.subtitle.refused":"결제 거부","error.message.unknown":"알 수 없는 오류 발생","errorPanel.title":"기존 오류","idealIssuer.selectField.title":"은행","idealIssuer.selectField.placeholder":"은행 선택","creditCard.success":"결제 성공",loading:"로드 중…",continue:"계속",continueTo:"다음으로 계속:","wechatpay.timetopay":"남은 결제 시한: %@","wechatpay.scanqrcode":"QR 코드 스캔",personalDetails:"개인 정보",companyDetails:"회사 정보","companyDetails.name":"회사명","companyDetails.registrationNumber":"등록 번호",socialSecurityNumber:"사회 보장 번호(주민등록번호)",firstName:"이름","firstName.invalid":"이름을 입력하세요.",infix:"명칭",lastName:"성","lastName.invalid":"성을 입력하세요.",mobileNumber:"휴대폰 번호","mobileNumber.invalid":"유효하지 않은 휴대폰 번호",city:"시",postalCode:"우편번호","postalCode.optional":"우편번호(선택 사항)",countryCode:"국가 코드",telephoneNumber:"전화번호",dateOfBirth:"생년월일",shopperEmail:"이메일 주소",gender:"성별","gender.notselected":"성별 선택",male:"남성",female:"여성",billingAddress:"청구지 주소",street:"도로명",stateOrProvince:"주/도",country:"국가",houseNumberOrName:"집 전화번호",separateDeliveryAddress:"배송 주소 별도 지정",deliveryAddress:"배송 주소",zipCode:"우편번호",apartmentSuite:"아파트/건물",provinceOrTerritory:"도",cityTown:"시/구",address:"주소",state:"주","field.title.optional":"(선택 사항)","creditCard.cvcField.title.optional":"보안 코드(선택 사항)","issuerList.wallet.placeholder":"전자 지갑 선택",privacyPolicy:"개인정보 보호정책","afterPay.agreement":"AfterPay의 %@에 동의합니다.",paymentConditions:"결제 조건",openApp:"앱 열기","voucher.readInstructions":"안내 읽기","voucher.introduction":"구매해 주셔서 감사합니다. 다음 쿠폰을 사용하여 결제를 완료하십시오.","voucher.expirationDate":"만료일","voucher.alternativeReference":"대체 참조번호","dragonpay.voucher.non.bank.selectField.placeholder":"제공 업체 선택","dragonpay.voucher.bank.selectField.placeholder":"은행 선택","voucher.paymentReferenceLabel":"결제 참조번호","voucher.surcharge":"%@ 할증료 포함","voucher.introduction.doku":"구매해 주셔서 감사합니다. 다음 정보를 이용하여 결제를 완료하십시오.","voucher.shopperName":"구매자 이름","voucher.merchantName":"가맹점","voucher.introduction.econtext":"구매해 주셔서 감사합니다. 다음 정보를 이용하여 결제를 완료하십시오.","voucher.telephoneNumber":"전화번호","voucher.shopperReference":"구매자 참조번호","voucher.collectionInstitutionNumber":"수금 기관 번호","voucher.econtext.telephoneNumber.invalid":"전화번호는 10자리 또는 11자리 숫자여야 합니다","boletobancario.btnLabel":"Boleto 생성","boleto.sendCopyToEmail":"내 이메일로 사본 보내기","button.copy":"복사","button.download":"다운로드","boleto.socialSecurityNumber.invalid":"유효하지 않은 필드입니다","creditCard.storedCard.description.ariaLabel":"저장된 카드는 %@ 후 종료됩니다.","voucher.entity":"발급사",donateButton:"기부하기",notNowButton:"다음에 하기",thanksForYourSupport:"도와주셔서 감사합니다!",preauthorizeWith:"사전 승인 방법:",confirmPreauthorization:"사전 승인 확인",confirmPurchase:"구매 확인",applyGiftcard:"기프트 카드로 결제",giftcardBalance:"기프트 카드 잔액",deductedBalance:"공제 잔액","creditCard.pin.title":"비밀번호","creditCard.encryptedPassword.label":"카드 비밀번호 첫 2자리","creditCard.encryptedPassword.placeholder":"12","creditCard.encryptedPassword.invalid":"유효하지 않은 번호","creditCard.taxNumber":"카드 소유자 생년월일 또는 법인 등록 번호","creditCard.taxNumber.label":"카드 소유자 생년월일(예: 870130) 또는 법인 등록 번호(10자리)","creditCard.taxNumber.labelAlt":"법인 등록 번호(10자리)","creditCard.taxNumber.invalid":"유효하지 않은 카드 소유자 생년월일 또는 법인 등록 번호","storedPaymentMethod.disable.button":"삭제","storedPaymentMethod.disable.confirmation":"저장된 결제 수단 삭제","storedPaymentMethod.disable.confirmButton":"예, 삭제합니다","storedPaymentMethod.disable.cancelButton":"취소","ach.bankAccount":"은행 계좌","ach.accountHolderNameField.title":"계좌 소유자 이름","ach.accountHolderNameField.placeholder":"J. Smith","ach.accountHolderNameField.invalid":"유효하지 않은 계좌 소유자 이름","ach.accountNumberField.title":"계좌 번호","ach.accountNumberField.invalid":"유효하지 않은 계좌 번호","ach.accountLocationField.title":"ABA 라우팅 번호","ach.accountLocationField.invalid":"유효하지 않은 ABA 라우팅 번호","ach.savedBankAccount":"저장된 은행 계좌","select.state":"주 선택","select.stateOrProvince":"주/도 선택","select.provinceOrTerritory":"도 선택","select.country":"국가 선택","select.noOptionsFound":"검색된 옵션 없음","select.filter.placeholder":"검색...","telephoneNumber.invalid":"유효하지 않은 전화번호",qrCodeOrApp:"또는","paypal.processingPayment":"결제 처리 중...",generateQRCode:"QR 코드 생성","await.waitForConfirmation":"확인 대기중","mbway.confirmPayment":"MB WAY 앱에서 결제를 확인하십시오","shopperEmail.invalid":"유효하지 않은 이메일 주소","dateOfBirth.format":"DD(일)/MM(월)/YYYY(연도)","dateOfBirth.invalid":"최소 18세 이상이어야 합니다","blik.confirmPayment":"뱅킹 앱을 열어서 결제를 확인하세요.","blik.invalid":"6자리 숫자 입력","blik.code":"6자리 코드","blik.help":"뱅킹 앱에서 코드를 가져오세요.","swish.pendingMessage":"스캔 후 최대 10분 동안 상태가 보류될 수 있습니다. 10분 내에 다시 시도할 경우 금액이 여러 번 청구될 수 있습니다.","field.valid":"필드가 유효합니다","field.invalid":"필드가 유효하지 않습니다","error.va.gen.01":"미완료 필드","error.va.gen.02":"필드가 유효하지 않습니다","error.va.sf-cc-num.01":"올바른 카드 번호를 입력하세요.","error.va.sf-cc-num.02":"카드 번호를 입력하세요.","error.va.sf-cc-num.03":"지원되는 카드 브랜드를 하세요.","error.va.sf-cc-num.04":"전체 카드 번호를 입력하세요.","error.va.sf-cc-dat.01":"올바른 만료일을 입력하세요.","error.va.sf-cc-dat.02":"올바른 만료일을 입력하세요.","error.va.sf-cc-dat.03":"신용 카드가 곧 만료됩니다.","error.va.sf-cc-dat.04":"만료일을 입력하세요.","error.va.sf-cc-dat.05":"전체 만료일을 입력하세요.","error.va.sf-cc-mth.01":"만료 월을 입력하세요.","error.va.sf-cc-yr.01":"만료 연도를 입력하세요.","error.va.sf-cc-yr.02":"전체 만료 연도를 입력하세요.","error.va.sf-cc-cvc.01":"보안 코드를 입력하세요.","error.va.sf-cc-cvc.02":"전체 보안 코드를 입력하세요.","error.va.sf-ach-num.01":"계좌 번호 입력란이 비어 있습니다","error.va.sf-ach-num.02":"계좌 번호 길이가 정확하지 않습니다","error.va.sf-ach-loc.01":"은행 라우팅 번호 입력란이 비어 있습니다","error.va.sf-ach-loc.02":"은행 라우팅 번호 길이가 정확하지 않습니다","error.va.sf-kcp-pwd.01":"비밀번호 입력란이 비어 있습니다","error.va.sf-kcp-pwd.02":"비밀번호 길이가 잘못되었습니다","error.giftcard.no-balance":"이 기프트 카드에는 잔액이 없습니다","error.giftcard.card-error":"이 기프트 카드 번호는 당사에 등록되어 있지 않습니다","error.giftcard.currency-error":"기프트 카드는 발급된 통화로만 사용하실 수 있습니다","amazonpay.signout":"Amazon에서 로그아웃","amazonpay.changePaymentDetails":"결제 정보 변경","partialPayment.warning":"나머지 비용 지불에 사용할 다른 결제 수단 선택하기","partialPayment.remainingBalance":"남은 잔액은 %{amount}입니다","bankTransfer.beneficiary":"수령인","bankTransfer.iban":"IBAN","bankTransfer.bic":"BIC","bankTransfer.reference":"참조 번호","bankTransfer.introduction":"새 계좌 이체 건을 계속 진행합니다. 다음 화면에 나오는 정보를 이용해 이체를 완료하실 수 있습니다.","bankTransfer.instructions":"구매해 주셔서 감사합니다. 다음 정보를 이용하여 결제를 완료하십시오.","bacs.accountHolderName":"예금주 이름","bacs.accountHolderName.invalid":"예금주 이름이 유효하지 않습니다","bacs.accountNumber":"계좌 번호","bacs.accountNumber.invalid":"계좌 번호가 유효하지 않습니다","bacs.bankLocationId":"은행 식별 코드","bacs.bankLocationId.invalid":"은행 식별 코드가 유효하지 않습니다","bacs.consent.amount":"계좌에서 위의 금액을 이체하는 것에 동의합니다.","bacs.consent.account":"본인이 이 계좌의 예금주이며, 이 계좌에서의 자동 이체를 승인하기 위해 필요한 유일한 서명인입니다.",edit:"수정","bacs.confirm":"확인 및 결제","bacs.result.introduction":"자동 이체 안내(DDI/필수) 다운로드","download.pdf":"PDF 다운로드","creditCard.encryptedCardNumber.aria.iframeTitle":"카드 번호용 Iframe","creditCard.encryptedCardNumber.aria.label":"카드 번호","creditCard.encryptedExpiryDate.aria.iframeTitle":"만료 날짜용 Iframe","creditCard.encryptedExpiryDate.aria.label":"만료일","creditCard.encryptedExpiryMonth.aria.iframeTitle":"만료 월용 Iframe","creditCard.encryptedExpiryMonth.aria.label":"만료 월","creditCard.encryptedExpiryYear.aria.iframeTitle":"만료 연도용 Iframe","creditCard.encryptedExpiryYear.aria.label":"만료 연도","creditCard.encryptedSecurityCode.aria.iframeTitle":"보안 코드용 Iframe","creditCard.encryptedSecurityCode.aria.label":"보안 코드","creditCard.encryptedPassword.aria.iframeTitle":"비밀번호용 Iframe","creditCard.encryptedPassword.aria.label":"카드 비밀번호 첫 2자리","giftcard.encryptedCardNumber.aria.iframeTitle":"카드 번호용 Iframe","giftcard.encryptedCardNumber.aria.label":"카드 번호","giftcard.encryptedSecurityCode.aria.iframeTitle":"핀용 Iframe","giftcard.encryptedSecurityCode.aria.label":"비밀번호",giftcardTransactionLimit:"이 기프트카드로 건당 결제 가능한 최고 액수는 %{amount}","ach.encryptedBankAccountNumber.aria.iframeTitle":"은행 계좌 번호용 Iframe","ach.encryptedBankAccountNumber.aria.label":"계좌 번호","ach.encryptedBankLocationId.aria.iframeTitle":"은행 라우팅 번호용 Iframe","ach.encryptedBankLocationId.aria.label":"ABA 라우팅 번호","twint.saved":"저장됨",orPayWith:"기타 결제 수단:",invalidFormatExpects:"유효하지 않은 형식입니다. 예상 형식: %{format}","upi.qrCodeWaitingMessage":"즐겨 쓰는 UPI 앱으로 QR 코드를 스캔하여 결제하세요","upi.vpaWaitingMessage":"UPI 앱을 열어 결제를 확인하세요","upi.modeSelection":"UPI를 사용할 방식을 선택하세요.","onlineBanking.termsAndConditions":"계속 진행하는 경우 %#이용약관%#에 동의하게 됩니다.","onlineBankingPL.termsAndConditions":"계속 진행함으로써 귀하는 Przelewy24의 %#규정%# 및 %#정보 의무%#에 동의합니다.","ctp.loading.poweredByCtp":"Click to Pay 제공","ctp.loading.intro":"Click to Pay로 저장된 카드가 있는지 확인 중입니다...","ctp.login.title":"Click to Pay 계속 진행","ctp.login.subtitle":"계속하려면 Click to Pay에 연결된 이메일 주소를 입력하세요.","ctp.login.inputLabel":"이메일","ctp.logout.notYou":"본인이 아니신가요?","ctp.logout.notYourCards":"본인의 카드가 아닌가요?","ctp.logout.notYourCard":"본인의 카드가 아닌가요?","ctp.logout.notYourProfile":"본인의 프로필이 아닌가요?","ctp.otp.fieldLabel":"일회성 코드","ctp.otp.resendCode":"코드 재전송","ctp.otp.codeResent":"코드 재전송됨","ctp.otp.title":"Click to Pay 카드에 접근","ctp.otp.subtitle":"%@로 전송된 %@ 코드를 입력하여 본인 인증을 진행합니다.","ctp.emptyProfile.message":"해당 Click to Pay 프로필에 등록된 카드가 없습니다","ctp.separatorText":"또는 사용","ctp.cards.title":"Click to Pay로 결제 완료","ctp.cards.subtitle":"사용할 카드를 선택하세요.","ctp.cards.expiredCard":"만료됨","ctp.manualCardEntry":"카드 직접 입력","ctp.aria.infoModalButton":"Click to Pay란?","ctp.infoPopup.title":"Click to Pay는 비접촉 결제의 편리함을 온라인으로 가져온 서비스입니다","ctp.infoPopup.subtitle":"Mastercard, Visa, 기타 결제 카드를 지원하는 빠르고 안전한 결제 수단입니다.","ctp.infoPopup.benefit1":"Click to Pay는 암호화를 통해 정보를 안전하게 보호합니다","ctp.infoPopup.benefit2":"전 세계 가맹점에서 사용하세요","ctp.infoPopup.benefit3":"한 번만 설정하면 앞으로의 결제가 간편해집니다","ctp.errors.AUTH_INVALID":"유효하지 않은 인증입니다","ctp.errors.NOT_FOUND":"계정을 찾을 수 없습니다. 유효한 이메일을 입력하거나 카드 정보를 직접 입력하여 진행하세요.","ctp.errors.ID_FORMAT_UNSUPPORTED":"지원되지 않는 형식입니다","ctp.errors.FRAUD":"사용자 계정이 잠겨 있거나 비활성화되었습니다","ctp.errors.CONSUMER_ID_MISSING":"요청에 소비자 ID가 누락되어 있습니다","ctp.errors.ACCT_INACCESSIBLE":"이 계정은 현재 사용할 수 없습니다(예: 잠겨 있음).","ctp.errors.CODE_INVALID":"잘못된 인증 코드입니다","ctp.errors.CODE_EXPIRED":"만료된 코드입니다","ctp.errors.RETRIES_EXCEEDED":"OTP 생성 재시도 횟수 제한을 초과했습니다","ctp.errors.OTP_SEND_FAILED":"OTP를 수신인에게 전송할 수 없습니다","ctp.errors.REQUEST_TIMEOUT":"문제가 발생했습니다. 다시 시도하거나 카드 정보를 직접 입력하세요.","ctp.errors.UNKNOWN_ERROR":"문제가 발생했습니다. 다시 시도하거나 카드 정보를 직접 입력하세요.","ctp.errors.SERVICE_ERROR":"문제가 발생했습니다. 다시 시도하거나 카드 정보를 직접 입력하세요.","ctp.errors.SERVER_ERROR":"문제가 발생했습니다. 다시 시도하거나 카드 정보를 직접 입력하세요.","ctp.errors.INVALID_PARAMETER":"문제가 발생했습니다. 다시 시도하거나 카드 정보를 직접 입력하세요.","ctp.errors.AUTH_ERROR":"문제가 발생했습니다. 다시 시도하거나 카드 정보를 직접 입력하세요.","paymentMethodsList.aria.label":"결제 수단을 선택하세요","companyDetails.name.invalid":"회사 이름을 입력하세요.","companyDetails.registrationNumber.invalid":"등록 번호를 입력하세요.","consent.checkbox.invalid":"이용 약관에 동의해야 합니다."}}}])