"use strict";
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const suggestedTimes = document.querySelector("#suggestedTimes");
const anythingElse = document.querySelector("#anythingElse");
const button = document.querySelector("#button");
const form = document.querySelector("#form");
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/1lo255MeT_SAg75luVLPZsSTPDz7mqyTKnz4ptZcGYiQ/formResponse"; // your google form response URL e.g https://docs.google.com/forms/u/0/d/e/1FAIpQLSdfVQ2ycW2AROnbmCmVw8I8Uc7Z40BZtjleJ_-IQjgtznQ_4cJl/formResponse

const handleSubmit = async (event) => {
  event.preventDefault();
  const nameValue = name.value;
  const emailValue = email.value;
  const suggestedTimesValue = suggestedTimes.value;
  const anythingElseValue = anythingElse.value;
  const formData = {
    "entry.1358203869": nameValue, // entry.253486596 is the name attribute for the full name field on our google form
    "entry.1510833437": emailValue, // entry.1124906099 is the name attribute for the email address field on our google form
    "entry.236559543": suggestedTimesValue, // entry.1163114650 is the name attribute for the notes address field on our google form
    "entry.1560292987": anythingElseValue,
  };
  const appendedFormData = newFormData({ ...formData });

  try {
    button.disabled = true;
    button.textContent = "processing...";
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: appendedFormData,
    });
    alert("We'll be in touch soon!");
  } catch (error) {
    alert("Something went wrong, please try again");
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Submit";
  }
};

form.addEventListener("submit", handleSubmit);

// A helper function to help convert the data to FormData
const newFormData = (inputs) => {
  const formData = new FormData();
  const newArr = Object.entries(inputs);
  newArr.map((item) => {
    return formData.append(`${item[0]}`, item[1]);
  });
  return formData;
};
