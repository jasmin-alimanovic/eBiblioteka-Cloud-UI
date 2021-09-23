import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

export default function BarChart({
  data,
  title,
  type,
  th,
  tv,
  len,
  height = 200,
  width = 400,
}) {
  const [key, setKey] = useState(false);
  useEffect(() => {
    function handleResize() {
      setKey((prevkey) => !prevkey);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  //funckija za dodavanje dana
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  //formatiranje datuma gdje uzimamo samo dan i mjesec, te smjestanje u matricu
  // oblika mx2 gdje su kolone datum i neki broj,
  let formatedDates = data.map((record) => [
    new Date(record.key)
      .toLocaleDateString()
      .slice(0, new Date(record.key).toLocaleDateString().length - 5),
    parseInt(record.count),
  ]);

  //dodavanje datuma od danasnjeg do unazad len dana
  //ovo moramo uraditi jer servis nece vratiti rekorde gdje je count 0
  let posljedniDani = [];
  for (let i = 0; i < len; i++) {
    let datum = addDays(Date.now(), -i).toLocaleDateString();
    posljedniDani.push([datum.slice(0, datum.length - 5), 0]);
  }

  //u nizu posljedniDani se override-u podaci ciji je datum isti kao
  // i u nizu formatedDates
  formatedDates.forEach((element) => {
    for (let i = 0; i < posljedniDani.length; i++) {
      if (posljedniDani.at(i)[0] === element[0]) {
        posljedniDani[i] = element;
      }
    }
  });

  //obrtanje niza da danasnji dan bude zadnji elemenata, jucersanji predzadnji itd.
  posljedniDani.reverse(2);

  //dodavanje naslova na pocetak niza-tako zahtijeva google-charts
  posljedniDani.unshift([th, tv]);

  return (
    <Chart
      key={key}
      className="chart"
      width={width}
      height={height}
      chartType={type}
      loader={<div>Loading chart</div>}
      data={posljedniDani}
      options={{
        title: title,
        chartArea: { width: "50%" },
        hAxis: {
          title: th,
          minValue: 0,
        },
        vAxis: {
          title: tv,
        },
        bars: "horizontal",
      }}
    />
  );
}
