let inputSearch = document.getElementById("inputSearch")
let iconCondition = document.getElementById("iconCondition")
let textCondition = document.getElementById("textCondition")
let textCity = document.getElementById("textCity")
let todayDegree = document.getElementById("todayDegree")
let tomorrowDegreeDay = document.getElementById("tomorrowDegreeDay")
let tomorrowDegreeNight = document.getElementById("tomorrowDegreeNight")
let iconConditionTomorrow = document.getElementById("iconConditionTomorrow")
let textConditionTomorrow = document.getElementById("textConditionTomorrow")
let nextTomorrowDegreeDay = document.getElementById("nextTomorrowDegreeDay")
let nextTomorrowDegreeNight = document.getElementById("nextTomorrowDegreeNight")
let iconConditionNextTomorrow = document.getElementById("iconConditionNextTomorrow")
let textConditionNextTomorrow = document.getElementById("textConditionNextTomorrow")

async function search(location) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`);
    let result = await data.json();

    if (result.forecast != undefined && result.forecast != null) {
        console.log(result);
        textCity.innerHTML = result.location.name
        todayDegree.innerHTML = result.current.temp_c + "<sup>o</sup>C"
        iconCondition.setAttribute("src", "https:" + result.current.condition.icon)
        textCondition.innerHTML = result.current.condition.text

        tomorrowDegreeDay.innerHTML = result.forecast.forecastday[1].day.
            maxtemp_c + "<sup>o</sup>C"

        tomorrowDegreeNight.innerHTML = result.forecast.forecastday[1].day.
            mintemp_c + "<sup>o</sup>"

        iconConditionTomorrow.setAttribute("src", "https:" + result.forecast.forecastday[1].day.condition.icon)
        textConditionTomorrow.innerHTML = result.forecast.forecastday[1].day.condition.text

        nextTomorrowDegreeDay.innerHTML = result.forecast.forecastday[2].day.
            maxtemp_c + "<sup>o</sup>C"

        nextTomorrowDegreeNight.innerHTML = result.forecast.forecastday[2].day.
            mintemp_c + "<sup>o</sup>"

        iconConditionNextTomorrow.setAttribute("src", "https:" + result.forecast.forecastday[2].day.condition.icon)
        textConditionNextTomorrow.innerHTML = result.forecast.forecastday[2].day.condition.text


        let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dd = new Date(result.forecast.forecastday[0].date);
        let dayName = weekday[dd.getDay()];
        document.getElementById("today").innerHTML = dayName;

        let ddd = new Date(result.forecast.forecastday[1].date);
        let tomorrowName = weekday[ddd.getDay()];
        document.getElementById("tomorrow").innerHTML = tomorrowName

        let dddd = new Date(result.forecast.forecastday[2].date);
        let nextTomorrowName = weekday[dddd.getDay()];
        document.getElementById("nextTomorrow").innerHTML = nextTomorrowName

        let d = new Date(result.forecast.forecastday[0].date);
        let day = d.getDate();

        let namesMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = new Date(result.forecast.forecastday[0].date);
        let name = namesMonth[month.getMonth()];
        document.getElementById("date").innerHTML = day + name;
    }
}

inputSearch?.addEventListener("keyup", function (e) {
    search(e.target.value)
})

search("cairo")