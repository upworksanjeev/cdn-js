var $ = require("jquery");

window.fmlead = (settings) => {
  var infoObj = { shieldSessionId: "", shieldId: "" };
  var settingOption = settings;
  var envObj = () => {
    return {
      shieldIDUrl:
        "https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=83a42d7f9511f84bbcace351be9ee1288035ef8d&TYPE=JS&AUTO=0",
      apiUrl: "https://tory-test.vercel.app/api/",
      businessUrl: window.location.origin,
      headers: {
        apiKey: "V40EZbrXHwCRxZejdaPVN2iiBo6si1tc",
        secretKey: "6ouBAKNRApCu1fIzQ3UncC6HdAcNiSAb",
        contentType: "application/x-www-form-urlencoded",
      },
      errorMessage: {
        success: false,
        status: 400,
        message: "Bed request!",
      },
    };
  };
  const initilaize = (settings) => {
    createShieldScript(envObj().shieldIDUrl);
    $(document).on("click", ".openFMlastViewBox", function () {
      $("#fmLastViewBox").toggle();
    });
  };
  const createShieldScript = (shieldIDUrl) => {
    var s = document.createElement("script");
    s.setAttribute("src", shieldIDUrl);
    s.onload = function () {
      getDeviceResult().then(
        async function (res) {
          if (res.result) {
            var shieldData = await res.result;
            infoObj.shieldSessionId = shieldData.session_id;
            infoObj.shieldId = shieldData.device_intelligence.shield_id;
            appendTrackingLayout();
          }
        },
        function (error) {
          console.log(error.message);
        }
      );
    };
    document.head.appendChild(s);
  };
  const getCustomerId = () => {
    var customerId = "",
      hash = "";
    var hashes = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split("&");
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      if (hash[0] == "customer_id") {
        customerId = hash[1];
      }
    }
    return customerId;
  };
  const postLastViewLink = () => {
    var postBody = {
      customer_id: getCustomerId(),
      token: getDealerToken(),
      device_id: infoObj.shieldId,
      business_url: envObj().businessUrl,
      pages_link: [window.location.href.split("?")[0]],
    };
    postRequest(postBody);
  };
  const getDealerToken = () => {
    var token = "",
      hash = "";
    var hashes = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split("&");
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      if (hash[0] == "token") {
        token = hash[1];
      }
    }
    return token;
  };
  const getLastViewLink = () => {
    var requestUrl = envObj().apiUrl + "lastViewed/";

    var businessUrl = envObj().businessUrl;
    var shieldIdd = infoObj.shieldId;
    var customerId = getCustomerId();
    var token = getDealerToken();
    if (businessUrl != "" || shieldIdd != "" || customerId != "") {
      var businessParam = "",
        deviceParam = "",
        customerParam = "",
        tokenParam = "";
      if (businessUrl != "") {
        businessParam = "?business_url=" + businessUrl;
      }
      if (shieldIdd != "") {
        deviceParam = "&device_id=" + shieldIdd;
      }
      if (customerId != "") {
        customerParam = "&customer_id=" + customerId;
      }
      if (token != "") {
        tokenParam = "&token=" + token;
      }
      requestUrl =
        requestUrl + businessParam + deviceParam + customerParam + tokenParam;
    }
    getRequest(requestUrl).then((lastViewData) => {
      showPreviewlink(lastViewData);
    });
  };
  const getRequest = async (requestUrl) => {
    if (requestUrl != "") {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch(requestUrl, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        fetch("https://nextjs-test-sage-delta.vercel.app/api/sampleApi", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      /*var getResponse = await fetch(requestUrl, {
        method: "GET"
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(
              "Request failed:",
              response.status,
              response.statusText
            );
          }
        })
        .then(function (data) {
          return data;
        })
        .catch(function (error) {
          return error;
        });*/
    } else {
      $this.settings.errorMessage.message = "Url is required!";
      return $this.settings.errorMessage;
    }
    return getResponse;
  };
  const showPreviewlink = (lastViewData) => {
    var linkUrl = "";
    var dataResponse = JSON.parse(lastViewData);
    if (dataResponse && dataResponse.data) {
      var objectLinks = dataResponse.data.data;
      for (var i = 0; i < objectLinks.length; i++) {
        objectLinks[i].page_links.forEach((val) => {
          linkUrl +=
            '<li style="border-bottom: 1px solid #e5e5e5; padding: 15px 25px;"><a style="color: #043ec5; text-decoration: none;" href="' +
            val.url +
            '">' +
            val.url +
            "</a></li>";
        });
      }
    }
    document.getElementById("fmPageLinks").innerHTML = linkUrl;
  };
  const postRequest = (data) => {
    var requestUrl = envObj().apiUrl + "lastViewed";
    if (data) {
      var postBody = JSON.stringify(data);
      var requestOptions = {
        method: "POST",
        body: postBody
      };
      fetch(requestUrl, requestOptions)
        .then((response) => {
          if (response.ok) {
            getLastViewLink();
            return response.text();
          } else {
            throw new Error(
              "Request failed:",
              response.status,
              response.statusText
            );
          }
        })
        .then(function (result) {
          return result;
        })
        .catch(function (error) {
          return error;
        });
    } else {
      envObj().errorMessage.message = "Business object format is wrong!";
      return envObj().errorMessage;
    }
  };

  const dhjff = () => {
    console.log("this is test ");
  };
  const appendTrackingLayout = () => {
    console.log("---envObj.shieldId---", infoObj.shieldId);
    console.log("----settingOption-----", settingOption);

    var bgColor = settingOption.bgColor;
    var iconPosition = settingOption.iconPosition;
    var fromBottom = settingOption.fromBottom;
    if (iconPosition.toLowerCase() == "left") {
      positionParam = "left:10px;bottom:" + fromBottom + "px;";
    } else {
      positionParam = "right:10px;bottom:" + fromBottom + "px;";
    }
    var headLine = settingOption.headLine;
    postLastViewLink();

    var htl = '<div class="fmLeadTrack">';
    htl +=
      '<div style="position:fixed; width:100%; min-height:100vh; display:flex; align-items: center;justify-content: center;">';

    htl +=
      '<div style="background: ' +
      bgColor +
      ';border-radius: 7px; overflow-x: hidden; width: 100%; max-width: 650px; display:none;" id="fmLastViewBox"><div style="display: grid; grid-template-columns: 60px 1fr 30px; align-items: center; padding: 10px; border-bottom: 1px solid #ccc; background: #ededed;"><img style="width: 55px; mix-blend-mode: darken;" src="https://results.fanaticmarketing.com/_next/image?url=%2Fimages%2Flogos%2Flogo.png&w=256&q=75" alt="logo"><h3 style="margin: 0; text-align: center;">' +
      headLine +
      '</h3><button  class="openFMlastViewBox" style="padding: 0; background: transparent; border: navajowhite; cursor: pointer;"><svg height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg></button></div><ul style="padding: 0; list-style-type: none;" id="fmPageLinks">';

    htl += "</ul></div></div>";

    htl +=
      '<a style="position: fixed; ' +
      positionParam +
      " width: 75px; height: 75px; border-radius: 50%; overflow: hidden; background: " +
      bgColor +
      ';" href="javascript:;" class="openFMlastViewBox">';
    htl +=
      '<img  style="object-fit: contain; width: 80%; height: 100%; display: block; margin: 0 auto;" src="https://results.fanaticmarketing.com/_next/image?url=%2Fimages%2Flogos%2Flogo.png&w=256&q=75">';
    htl += "</a>";
    htl += "</div>";
    const fmLeadConent = document.createElement("div");
    fmLeadConent.innerHTML = htl;
    document.body.insertBefore(fmLeadConent, document.body.firstChild);
  };
  const init = () => {
    $(document).ready(function () {
      initilaize();
    });
  };

  init();
};
