$(document).ready(() => {
   const firstName = $("#firstName")
   const lastName = $("#lastName")
   const email = $("#email")
   const password = $("#password")
   const squad = $("#squad")
   const score = $("#score")

   console.log(localStorage.userEmail)

   a.get("/api/user/;" + localStorage.userEmail, (data) => {
      console.log(data)
      firstName.val(data.firstName)
      lastName.val(data.lastName)
      email.val(data.email)
      password.val(data.password)
      squad.val(data.squad)
      score.val(data.score)
   })





})