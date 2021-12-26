let URL;
const urlMale = 'https://teachablemachine.withgoogle.com/models/f2-0IrZoM/';
const urlFemale = 'https://teachablemachine.withgoogle.com/models/H4ibykhYG/';
let model, labelContainer, maxPredictions;

async function init() {
    if (document.getElementById('gender').checked) {
        URL = urlMale;
    } else {
        URL = urlFemale;
    }
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement('div'));
    }
}

async function predict() {
    var image = document.getElementById('face-image');
    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    console.log(prediction[0].className);
    var resultTitle, resultExplain, resultCeleb;
    if (document.getElementById("gender").checked) {
                switch (prediction[0].className) {
                    case "가르마펌":
                        resultTitle = "깔끔하게 단정된 가르마펌"
                        resultExplain = "지적인 이미지가 느껴져 신뢰도도 더 느껴지는 머리인 가르마펌! 이마가 보여 답답한 느낌이 덜한 특징이 있다! 평소에 지적인 이미지와 시원시원한 이미지를 가지고 싶었다면 한번쯤은 도전해도 좋을만한 머리!";
                        break;
                    case "댄디컷":
                        resultTitle = "모던한 느낌이 나는 신사 스타일의 댄디컷"
                        resultExplain = "이마를 커버하고 싶거나 뻣뻣한 머릿결을 가지고있어 평소에 앞머리를 올리는 것이 부담스럽거나 머리를 손질하기 어려운 사람이 하기에 좋은 댄디컷 한번 해보시는건 어떠신가요?";
                        break;
                    case "쉼표머리":
                        resultTitle = "부드럽게 곡선을 그리는 쉼표머리"
                        resultExplain = "소화하기 어렵기로 유명한 머리지만 남자라면 한번쯤은 해보고 싶던 쉼표머리! 쉼표머리를 소화하게 되면 너무 잘생겨보여 앞이 안보일지도~";
                        break;
                    case "댄디쉐도우펌":
                        resultTitle = "자연스러운 컬과 볼륨감 있는 댄디쉐도우펌"
                        resultExplain = "훈남 연예인들도 많이 연출하고 일반인 훈남들도 많이 연출하는 댄디 쉐도우펌! 너무 잘생겼어요!!";
                        break;
                    case "포마드":
                        resultTitle = "상남자 스타일 포마드"
                        resultExplain = "고전적이고 중후한멋을 풍기는 포마드 헤어스타일! 당신 그렇게 멋있어도 되는겁니까? ㅡㅡ";
                        break;
                    default:
                        resultTitle = "알수없음"
                        resultExplain = "";
                }
            } else {
                switch (prediction[0].className) {
                    case "긴머리C컬펌":
                        resultTitle = "윤기와 탄력이 있는 긴머리 C컬펌"
                        resultExplain = "ㅁ";
                        break;
                    case "긴머리웨이브펌":
                        resultTitle = "머릿결이 한올 한올 사랑스럽게 굽이치는 긴머리웨이브펌"
                        resultExplain = "ㅁ";
                        break;
                    case "내츄럴물결펌":
                        resultTitle = " 내추럴하면서도 톡톡튀는 내츄럴 물결펌"
                        resultExplain = "ㅁ";
                        break;
                    case "레이어드컷":
                        resultTitle = "여러층이 있어 단순하지만 이쁜 레이어드컷"
                        resultExplain = "ㅁ";
                        break;
                    case "단발":
                        resultTitle = "귀여운 스타일의 단발머리"
                        resultExplain = "ㅁ";
                        break;
                    default:
                        resultTitle = "알수없음"
                        resultExplain = "";
                }
            }
    var title =
        "<div class='" + prediction[0].className + "-phone-title'>" + resultTitle + '</div>';
    var explain = "<div class='phone-explain pt-2'>" +'</div>';
    $('.result-message').html(title + explain);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('#loading').show();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
        init().then(function () {
            predict();
            $('#loading').hide();
        });
    } else {
        removeUpload();
    }
}

function gaReload1() {
    event.preventDefault();
    $('.cd-popup').addClass('is-visible');
}
function gaReload2() {
    window.location.reload();
}

jQuery(document).ready(function ($) {
    //close popup
    $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup').removeClass('is-visible');
        }
    });
});