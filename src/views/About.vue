<template>
  <v-app>  
    <v-main>
      <v-container fluid>
        <canvas id="planet-chart"></canvas>
      </v-container>
      <p>salam</p>
      <!-- <span>{{ "2021-05-08" | moment("jYYYY/jM/jD") }}</span> -->

      <!-- or create a new date from 'now' -->
      <!-- <span>{{ new Date() | moment("dddd, MMMM Do YYYY") }}</span> -->
      <!-- <span>{{ someDate | moment("calendar") }}</span> -->
    </v-main>
  </v-app>
</template>

<script>

// import HelloWorld from '@/components/HelloWorld.vue'
// import Chart from 'chart.js'
// import moment from 'vue-moment'
import moment from 'jalali-moment'




export default {
  name: 'Home',
  components: {
  },
  data() {
    return {  
  planetChartData: {
  type: "line",
  data: {
    labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
    datasets: [
      {
        label: "Number of Moons",
        data: [0, 0, 1, 2, 79, 82, 27, 14],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      },
      {
        label: "Planetary Mass (relative to the Sun x 10^-6)",
        data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25
          }
        }
      ]
    }
  }
}  
    }
  },
  methods: {

  },
  mounted: function () {
    // const ctx = document.getElementById('planet-chart');
    // new Chart(ctx, this.planetChartData);
    var m = moment("2021-05-07")
    m.locale('fa');
    var output = m.format('ddd') + ' ' + m.format("YYYY/MMMM/DD")
    console.log(output)
  }

}
</script>
