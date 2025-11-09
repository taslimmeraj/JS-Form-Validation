const jsFrom = document.querySelector("#jsFrom");
const countries = document.querySelector("#countries");
const err = document.querySelectorAll(".err");
const Genders = ["Male","Female", "Others"];
const SkillsArr = ["HTML", "Css", "JavaScript", "React Js", "Mongo DB", " Express . Jr"];

err.forEach((e) => {
  e.style.cssText = `
    color: red;
    font-size: 14px;
    font-style: italic;
    margin-bottom: 6px;
    margin-top: 2px;
  `;
});
const errName = document.querySelector(".errName");
const errEmail = document.querySelector(".errEmail");
const errPass = document.querySelector(".errPass");
const errcPass = document.querySelector(".errcPass");
const errGender = document.querySelector(".errGender");
const errSkills = document.querySelector(".errSkills");
const errCountry = document.querySelector(".errCountry");

const createOption = (val) => {
  const option = document.createElement("option");
  option.setAttribute("value", val);
  option.textContent = val;
  countries.appendChild(option);
};
let data;
const getCountry = async () => {
  const res = await fetch("./js/countries.json");
  data = await res.json();
  data.forEach((d) => {
    createOption(d.name);
  });
};
getCountry();

jsFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(jsFrom);
  const Name = formData.get("Name");
  const Email = formData.get("Email");
  const Pass = formData.get("Pass");
  const cPass = formData.get("cPass");
  const Gender = formData.get("Gender");
  const Skills = formData.getAll("Skills");
  const Country = formData.get("Country");
  console.log(Name, Email, Pass, cPass, Gender, Skills, Country);

  if (!Name) {
    errName.textContent = "Please Provide Your name here";
  } else if (!/^[A-Z a-z.]*$/.test(Name)) {
    errName.textContent = "Invalid name format";
  } else {
    errName.textContent = null;
  }

  if (!Email) {
    errEmail.textContent = "Please Provide Your Email here";
  } else if (!/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)) {
    errEmail.textContent = "Invalid Email Adress";
  } else {
    errEmail.textContent = "";
  }

  if (!Pass) {
    errPass.textContent = "Please Provide Your Pass here";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'"\\|,.<>/?]).{6,}$/.test(
      Pass
    )
  ) {
    errEmail.textContent =
      " Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  } else {
    errPass.textContent = "";
  }

  if (!cPass) {
    errcPass.textContent = "Please Confirm Password";
  } else if (Pass !== cPass) {
    errcPass.textContent = "Password Did not Match";
  }

  if (!Gender) {
    errGender.textContent = "Please Select Your Gender";
  } else if (Genders.indexOf(Gender)== -1) {
errGender.textContent="Invalid Gender";
} else {
    errGender.textContent=""

  }

  if (Skills.length == 0) {
    errSkills.textContent = "Please Select Your Skills";
  } else {
    if ( Skills.filter(item => !SkillsArr.includes(item)).length>0)
      errSkills.textContent= "Paknami Bondo koro Bro";
    } 
    

  if (!Country) {
  errCountry.textContent = "Please Provide Your Country here";
} else if (!data.find(f => f.name === Country)) {
  errCountry.textContent = "Invalid Country";
} else {
  errCountry.textContent = "";
}

})

const showpass = document.getElementById("showpass");
const pass = document.getElementById("pass");
const cpass = document.getElementById("cpass");

showPass.addEventListener("change", e => {
  if (e.target.checked) {
    pass.setAttribute("type", "text");
    cpass.setAttribute ("type", "text")
  } else {
     pass.setAttribute("type", "password");
    cpass.setAttribute ("type", "password")
  }
})