const options = {
  series: [
    {
      name: "cambio",
      data: [
        {
          x: new Date("2018-02-12").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-13").getTime(),
          y: 5.3,
        },
        {
          x: new Date("2018-02-14").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-15").getTime(),
          y: 5.11,
        },
        {
          x: new Date("2018-02-16").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-17").getTime(),
          y: 5.25,
        },
        {
          x: new Date("2018-02-18").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-19").getTime(),
          y: 5.2,
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  yaxis: {
    min: 5,
    tickAmount: 4,
    labels: {
      formatter: (value) => {
        return value.toFixed(1).replace(".", ",");
      },
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    axisTicks: {
      show: false,
    },
  },
  fill: {
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  colors: ["#7C3AED"],
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return `<div class="tooltip">
      <span>${String(series[seriesIndex][dataPointIndex]).replace(
        ".",
        ","
      )}</span>
      <span>${new Date(
        w.globals.seriesX[seriesIndex][dataPointIndex]
      ).toLocaleDateString("pt-BR", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}</span>
      </div>`;
    },
  },
};

const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// currencyAPI
const currencyOneEl = document.querySelector('[data-js="currency-one');
const currencyTwoEl = document.querySelector('[data-js="currency-two');
const currenciesEl = document.querySelector(".money-wrapper");

const url =
  "https://v6.exchangerate-api.com/v6/578bdb307639a212ba04aedd/latest/USD";

const fetchEnchangeRate = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Sua conexão falhou. Não foi possível obter as informações."
      );
    }

    const enchangeRateData = await response.json();

    if (enchangeRateData.result === "error") {
      throw new Error(getErrormessage(enchangeRateData["error-type"]));
    }
  } catch (err) {
    const div = document.createElement("div");
    const button = document.createElement("button");

    div.textContent = err.message;
    div.classList.add(
      "alert",
      "alert-warning",
      "alert-dismissible",
      "fade",
      "show"
    );
    div.setAttribute("role", "alert");
    button.classList.add("btn-close");
    button.setAttribute("type", "button");
    button.setAttribute("Atrribute", "Close");

    button.addEventListener("click", () => {
      div.remove();
    });

    div.appendChild(button);
    currenciesEl.insertAdjacentElement("afterend", div);
  }
};

const init = async () => {
  const enchangeRateData = await fetchEnchangeRate();

  const getOptions = (selectedCurrency) =>
    Object.keys(enchangeRateData.conversion_rates)
      .map(
        (currency) =>
          `<options ${
            currency === selectedCurrency ? "selected" : ""
          }> ${currency} </options>`
      )
      .join("");

  console.log(getOptions);

  currencyOneEl.innerHTML = getOptions;
  currencyTwoEl.innerHTML = getOptions;
};

init();
