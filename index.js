const city=document.getElementById('city');
const enter=document.getElementById('enter');
const result=document.getElementById('result');
const now=new Date();
const year=now.getFullYear();
const days=[ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const day=days[now.getDay()];
 result.innerHTML=`<p class="day" >${day}</p>`

async function getweather() {


    const  cityname=city.value.trim();
    if(!cityname){
      const resultget=  result.innerHTML=`<p> please enter valid city name </p>`;
        return resultget ;
    }
    try{
        const URL= `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=ef1eb3c330105c1bc3a158c259be8458&units=metric`;
        const response=await fetch(URL);
        const data=await response.json();
        const rainChance = data.clouds?.all ?? 0;


    let cloudyHTML = rainChance >50 && rainChance<=80
      ? `<p> </p><img src="https://openweathermap.org/img/wn/03d@2x.png" alt="Cloudy Icon" width="90px" height="100px"/>`
      : "";
      const heavyrain=rainChance > 80
      ? `<p> </p><img src="https://openweathermap.org/img/wn/09d@2x.png" alt="Rainy Icon" width="200px"/>`
      : "";
      const temp=data.main.temp;
      const tempHTML=rainChance<50 ?`<p>Its Sunny</p><img src= "https://openweathermap.org/img/wn/01d@2x.png" alt="Clear sky width="90"/>`: "";
      const humidity=data.main.humidity;
      const Humidityhtml=`<p>💧</p>`;
        
        result.innerHTML=`<div class="date"><p class="day" >${day}</p> <h3 >${data.name},${data.sys.country}</h3></div><p class="type"> ${heavyrain}${cloudyHTML} ${tempHTML} </p>
        <div class=weatherinfo>

        <p class="temp">${temp}°C</p> 
       
         <p>RainChance: ${ data.clouds?.all ?? 0 }%  </p>
         
         
     <div class="humid">   <p>Humidity:${humidity}% </p>${Humidityhtml}</div>
        <p>Visibility:${data.visibility}%</p>
        </div>
       `
    }
    
    catch(err){
console.log("fetching error",err);
    }
    
    
}
enter.addEventListener("click",getweather);