import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const Legend = () => {
    const { map } = useLeaflet();


    useEffect(() => {
        // get color depending on population density value
        const getColor = (d: any) => {
            return d > 500000
                ? '#800026'
                : d > 300000
                    ? '#BD0026'
                    : d > 200000
                        ? '#E31A1C'
                        : d > 100000
                            ? '#FC4E2A'
                            : d > 50000
                                ? '#FD8D3C'
                                : d > 25000
                                    ? '#FEB24C'
                                        : '#FED976';
        };

        const legend = L.control.attribution({ position: "bottomright" });

        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");
            const grades = [0, 25000, 50000, 100000, 200000, 300000, 500000];
            let labels = [];
            let from;
            let to;

            for (let i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push(
                    // <>
                    //     <i style={{ background: getColor(from + 1) }}></i>
                    //     <span>{`${from} ${to ? "&ndash;" + to : "+"}`} </span>
                    // </>
                    '<i class="icon-legend" style="background:' +
                    getColor(from + 1) +
                    ';"></i> ' +
                    Intl.NumberFormat("pt-BR").format(from) +
                    (to ? "&ndash;" + Intl.NumberFormat("pt-BR").format(to) : " +")
                );
            }

            div.innerHTML = labels.join("<br>");
            return div;
        };

        if (map)
            legend.addTo(map);
    },[]);
    return null;
};

export default Legend;