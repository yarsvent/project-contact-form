// TERRIBLE SOLUTION!!!! but it works
document.querySelector('#general-enquiry').addEventListener('change', (evt) => {
  document.getElementById("support-request-container").classList.remove('radio-button-active');
  document.getElementById("general-enquiry-container").classList.add('radio-button-active');
});
document.querySelector('#support-request').addEventListener('change', (evt) => {
  document.getElementById("general-enquiry-container").classList.remove('radio-button-active');
  document.getElementById("support-request-container").classList.add('radio-button-active');
});

// Enter key support for accessibility of radio & check buttons
document.querySelectorAll('.radio-box, .checkbox-box').forEach((elem) => {
  elem.addEventListener('keypress', function(event) {
      if (event.which === 13) {
        if (elem.id == "general-enquiry-container") document.getElementById("general-enquiry").checked = !document.getElementById("general-enquiry").checked;
        if (elem.id == "support-request-container") document.getElementById("support-request").checked = !document.getElementById("support-request").checked;

        // This clunky section removes/adds change classes
        document.getElementById("support-request-container").classList.remove('radio-button-active');
        document.getElementById("general-enquiry-container").classList.remove('radio-button-active');
        if (document.getElementById("general-enquiry").checked) {
          document.getElementById("general-enquiry-container").classList.add('radio-button-active');
        }
        if (document.getElementById("support-request").checked) {
          document.getElementById("support-request-container").classList.add('radio-button-active');
        }

        if (elem.id == "checkbox-container") document.getElementById("consent").checked = !document.getElementById("consent").checked;
      }
  });
});

// Submit form & Validation
document.addEventListener('submit', (function () {
  return function (e) {
    let isError = false;
    document.querySelectorAll('.error').forEach((elem) => {
      if (elem.classList.contains("error-visible")) elem.classList.remove("error-visible");
    });
    document.querySelectorAll('input[required], textarea').forEach((inp) => {
      let caused_error = false;
      if (inp.classList.contains("error-input")) inp.classList.remove("error-input");
      let email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (inp.id == "email" && inp.value != "" && !email_regex.test(inp.value)) {
        // Email is incorrect
        isError = true;
        caused_error = true;
        document.getElementById("email-invalid").classList.add("error-visible");
      }
      else if (inp.id == "general-enquiry" || inp.id=="support-request") {
        if (!document.getElementById("general-enquiry").checked && !document.getElementById("support-request").checked) {
          // No radio buttons pressed
          isError = true;
          document.getElementById("query-req").classList.add("error-visible");
        }
      }
      else if (inp.id == "consent" && !inp.checked) {
        // Consent not given
        isError = true;
        document.getElementById("consent-req").classList.add("error-visible");
      }
      else if (inp.value == "") {
        // Handling missing text (grouped for simplicity)
        isError = true;
        caused_error = true;
        let target_id = inp.id+"-req";
        document.getElementById(target_id).classList.add("error-visible");
      }
      if (caused_error) inp.classList.add("error-input");
    });
    if (isError) {
      e.preventDefault();
    }
    else {
      document.getElementById('success-toast').style.display = "inline-block";
      e.preventDefault();
    }
  };
})(), true);
