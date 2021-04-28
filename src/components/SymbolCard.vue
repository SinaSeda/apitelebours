<template>
<v-hover>
  <template  v-slot="{ hover }">
    <v-container class="vazir">
      <v-row justify="center">
        <v-dialog v-model="dialog" width="70vw">
          <template v-slot:activator="{ on, attrs }">
      <!-- <p class="test">click</p> -->
            <v-card
              :elevation="hover ? 24 : 6"
              class="mx-auto card vazir"
              shaped
              outlined

                v-bind="attrs"
                v-on="on"
                @click="modal()"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <!-- <div class="overline mb-4">{{trendSymbolObj.symbol}}</div> -->
                  
                  <v-list-item-title class="headline mb-1">
                    <v-icon style="font-size: 1.5vw;">mdi-check-circle-outline</v-icon><span class="vazir">{{trendSymbolObj.symbol}}</span><br>
                    <span style="font-size: 1vw;"><a :href="'http://www.tsetmc.com/Loader.aspx?ParTree=151311&i=' + symbolInfoo.data.tsetmc_code">
                      <v-icon style="font-size: 1vw;">mdi-link</v-icon><span class="vazir">{{symbolInfoo.data.name}}</span>
                    </a></span>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-icon style="font-size: 1.5vw;">mdi-calendar-check-outline</v-icon> تاریخ: {{trendSymbolObj.date}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-icon style="font-size: 1.5vw;">mdi-plus-circle-outline</v-icon> امتیاز: {{trendSymbolObj.score}} | تعداد پیام : {{trendSymbolObj.number_of_messages}}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="100"
                  color="grey"
                >
                  <v-img class="imgBorder" :src="symbolInfoo.data.logo"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <!-- <v-btn text>Button</v-btn>
                <v-btn text>Button</v-btn> -->
              </v-card-actions>
            </v-card>
          </template>
<!-- --------------------Dialoge Content---------------------------- -->
          <!-- <v-card
            mx-auto 
            card
          > -->
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <!-- <div class="overline mb-4">{{trendSymbolObj.symbol}}</div> -->
                  
                  <v-list-item-title class="headline mb-1">
                    <v-icon style="font-size: 1.5vw;">mdi-check-circle-outline</v-icon><span class="vazir">{{trendSymbolObj.symbol}}</span>
                    <span style="font-size: 1vw;" class="vazir"> ({{symbolInfoo.data.name}})</span>
                  </v-list-item-title>
                  
                    <span class="vazir"><v-icon style="font-size: 1.5vw;">mdi-calendar-check-outline</v-icon> تاریخ: {{trendSymbolObj.date}}</span>
                  
                    <span class="vazir"><v-icon style="font-size: 1.5vw;">mdi-plus-circle-outline</v-icon> امتیاز: {{trendSymbolObj.score}} | تعداد پیام : {{trendSymbolObj.number_of_messages}}</span>
                  
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="100"
                  color="grey"
                >
                  <v-img class="imgBorder" :src="symbolInfoo.data.logo"></v-img>
                </v-list-item-avatar>
              </v-list-item>
<!-- ------------------------Chart Vuetify------------------------------->
<TrendChart
  :selectDate="trendSymbolObj.date"
  :symbolId="trendSymbolObj.id"
/>
    <!-- <v-card-text>
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline
          :value="values"
          :labels="keys"
          label-size="1"
          type="bar"
          color="white"
          line-width="2"
          padding="16"
          smooth
        >
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">Sales Last 24h</div>
    </v-card-text> -->
<!-- ------------------------------------------------------------------- -->

              <!-- <v-card-actions>
                <v-btn text>Button</v-btn>
                <v-btn text>Button</v-btn>
              </v-card-actions> -->

            <!-- <v-card-title>
              <span class="headline">
                <span class="vazir titleModal">{{trendSymbolObj.symbol}} ({{symbolInfoo.data.name}})</span>
              </span>
            </v-card-title>
            <v-list-item  style="font-size: 0.8vw;">
              <div><v-icon style="font-size: 1.5vw;">mdi-calendar-check-outline</v-icon> تاریخ: {{trendSymbolObj.date}}</div>
            </v-list-item>
            <v-list-item  style="font-size: 0.8vw;">
              <div><v-icon>mdi-plus-circle-outline</v-icon> امتیاز: {{trendSymbolObj.score}}</div>
            </v-list-item>
            <v-list-item-avatar
              tile
              size="100"
              color="grey"
            >
              <v-img class="imgBorder" :src="symbolInfoo.data.logo"></v-img>
            </v-list-item-avatar>
            <v-card-text>Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.
              Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo taciti odio, amet viverra scelerisque quis quis et tortor, curabitur morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque aenean quia vitae nostra, tempus elit enim id dui, at egestas pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam. Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum risus, quam ac egestas.
              Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a dictumst cras augue, purus imperdiet non. Varius montes cursus varius vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor, maecenas lorem in ut nec mauris tortor, doloribus varius sem tortor vestibulum mollis, eleifend tortor felis tempus lacus eu eu. Eleifend vel eu, nullam maecenas mauris nec nunc euismod, tortor porta ridiculus potenti, massa tristique nam magna, et wisi placerat et erat ante. Eget pede erat in facilisis, fermentum venenatis sodales. Ac tortor sociis et non animi tristique, rhoncus malesuada, ut arcu volutpat scelerisque sollicitudin, elit curabitur dui pede purus dolor, integer aenean risus taciti nulla eleifend accumsan. At pulvinar diam parturient, interdum mi velit aliquet et a. Arcu at ac placerat eget justo semper, purus sociis curabitur mi ipsum consequat ut, mollis vestibulum, est ante ornare lacus sem. Neque magna mauris, commodo quisque, praesent semper suscipit lobortis nam. Justo malesuada cursus ac nunc litora nunc. Tellus ac, in lobortis nunc, montes lectus purus fermentum.
              Ac sit wisi. Sodales aliquam, sed vestibulum nullam arcu sit risus arcu, id luctus vitae lorem nibh, integer nec nullam class cursus mi, purus arcu lectus. Vel ante suscipit volutpat potenti mattis sed, wisi eu placerat aliquam erat, lectus morbi lobortis at assumenda. Consequat neque purus ipsum voluptas odio, netus vestibulum ut nec, suspendisse pellentesque nec enim in. Wisi dictum sed semper a, ipsum erat tellus habitasse est, erat sem ornare, vitae quisque ultricies. Dui sed blandit. Tempor et faucibus justo sed luctus, nec vitae vitae. Nunc nibh pede, ipsum vestibulum aenean leo ante ultricies, nam cras quis sed penatibus amet. In mauris a. Integer metus mauris tortor, et rutrum vestibulum ultricies, ut phasellus in ullamcorper ut mollit, eu justo. Cursus pretium venenatis.
              Cras pellentesque vel sodales accumsan aenean. Feugiat metus sit nec in aliquet amet, porttitor pretium vulputate massa. Consequat ipsum luctus quisque adipiscing libero. Wisi sollicitudin. Eget vitae ac lobortis, lorem natoque vestibulum et, aliquet faucibus at morbi nibh, vel condimentum. Massa unde orci sed id sed, odio donec congue nec praesent amet. Hymenaeos velit lacus, quis vivamus libero tempus duis, eu nisi eu, ipsum at accumsan pede justo morbi donec, massa et libero sit risus neque tortor. Ut sed sed etiam hendrerit dapibus, quis metus suspendisse nibh.
              Fringilla tempor felis augue magna. Cum arcu a, id vitae. Pellentesque pharetra in cras sociis adipiscing est. Nibh nec mattis at maecenas, nisl orci aliquam nulla justo egestas venenatis, elementum duis vel porta eros, massa vitae, eligendi imperdiet amet. Nec neque luctus suscipit, justo sem praesent, ut nisl quisque, volutpat torquent wisi tellus aliquam reprehenderit, curabitur cras at quis massa porttitor mauris. Eros sed ultrices. Amet dignissim justo urna feugiat mauris litora, etiam accumsan, lobortis a orci suspendisse. Semper ac mauris, varius bibendum pretium, orci urna nunc ullamcorper auctor, saepe sem integer quam, at feugiat egestas duis. Urna ligula ante. Leo elementum nonummy. Sagittis mauris est in ipsum, nulla amet non justo, proin id potenti platea posuere sit ut, nunc sit erat bibendum. Nibh id auctor, ab nulla vivamus ultrices, posuere morbi nunc tellus gravida vivamus.
              Mauris nec, facilisi quam fermentum, ut mauris integer, orci tellus tempus diam ut in pellentesque. Wisi faucibus tempor et odio leo diam, eleifend quis integer curabitur sit scelerisque ac, mauris consequat luctus quam penatibus fringilla dis, vitae lacus in, est eu ac tempus. Consectetuer amet ipsum amet dui, sed blandit id sed. Tellus integer, dignissim id pede sodales quis, felis dolorem id mauris orci, orci tempus ut. Nullam hymenaeos. Curabitur in a, tortor ut praesent placerat tincidunt interdum, ac dignissim metus nonummy hendrerit wisi, etiam ut.
              Semper praesent integer fusce, tortor suspendisse, augue ligula orci ante asperiores ullamcorper. In sit per mi sed sed, mi vestibulum mus nam, morbi mauris neque vitae aliquam proin senectus. Ac amet arcu mollis ante congue elementum, inceptos eget optio quam pellentesque quis lobortis, sollicitudin sed vestibulum sollicitudin, lectus parturient nullam, leo orci ligula ultrices. At tincidunt enim, suspendisse est sit sem ac. Amet tellus molestie est purus magna augue, non etiam et in wisi id. Non commodo, metus lorem facilisi lobortis ac velit, montes neque sed risus consectetuer fringilla dolor. Quam justo et integer aliquam, cursus nulla enim orci, nam cursus adipiscing, integer torquent non, fringilla per maecenas. Libero ipsum sed tellus purus et. Duis molestie placerat erat donec ut. Dolor enim erat massa faucibus ultrices in, ante ultricies orci lacus, libero consectetuer mauris magna feugiat neque dapibus, donec pretium et. Aptent dui, aliquam et et amet nostra ligula.
              Augue curabitur duis dui volutpat, tempus sed ut pede donec. Interdum luctus, lectus nulla aenean elit, id sit magna, vulputate ultrices pellentesque vel id fermentum morbi. Tortor et. Adipiscing augue lorem cum non lacus, rutrum sodales laoreet duis tortor, modi placerat facilisis et malesuada eros ipsum, vehicula tempus. Ac vivamus amet non aliquam venenatis lectus, sociosqu adipiscing consequat nec arcu odio. Blandit orci nec nec, posuere in pretium, enim ut, consectetuer nullam urna, risus vel. Nullam odio vehicula massa sed, etiam sociis mauris, lacus ullamcorper, libero imperdiet non sodales placerat justo vehicula. Nec morbi imperdiet. Fermentum sem libero iaculis bibendum et eros, eget maecenas non nunc, ad pellentesque. Ut nec diam elementum interdum. Elementum vitae tellus lacus vitae, ipsum phasellus, corporis vehicula in ac sed massa vivamus, rutrum elit, ultricies metus volutpat.
              Semper wisi et, sollicitudin nunc vestibulum, cursus accumsan nunc pede tempus mi ipsum, ligula sed. Non condimentum ac dolor sit. Mollis eu aliquam, vel mattis mollis massa ut dolor ante, tempus lacinia arcu. Urna vestibulum lorem, nulla fermentum, iaculis ut congue ac vivamus. Nam libero orci, pulvinar nulla, enim pellentesque consectetuer leo, feugiat rhoncus rhoncus vel. Magna sociosqu donec, dictum cursus ullamcorper viverra. Ultricies quis orci lorem, suspendisse ut vestibulum integer, purus sed lorem pulvinar habitasse turpis.
              +</v-card-text> -->
            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
              <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
            </v-card-actions> -->
          </v-card>
<!-- --------------------------------------------------------------- -->
        </v-dialog>
      </v-row>
    </v-container>
  </template>
</v-hover>
</template>

<script>
import TrendChart from '../components/TrendChart'
import symbolinfo from '../service/infosymbol'
import messages from '../service/messages'
import prices from '../service/prices'

  export default {
    name: 'SymbolCrad',
    props: {
      trendSymbolObj: {
        type: Object,
        default: null
      }
    },
    components: {
      TrendChart
    },
    data() {
      return {
        symbolInfoo: {
          data: {
            tsetmc_code: "",
            name: "",
            logo: ""
          }
        },
        dialog: false,
        msgChart: {
          data:{
          messages: [
            {
            key: "",
            value: 0
            }
          ]
          }
        },
        priceChart: {
          // data: [ {
          //   first_price: 0,
          //   updated_at: ""
          //   }
          // ]
        },
        keys: [],
        values: [],
      //         value: [
      //   423,
      //   446,
      //   675,
      //   510,
      //   590,
      //   610,
      //   760,
      // ],
      }
    },
    methods: {
      modal() {
        let dateFrom = new Date(this.trendSymbolObj.date)
        dateFrom.setDate(dateFrom.getDate() - 14)
        let fromDate = dateFrom.toISOString().split("T")[0]
        let dateTo = new Date(this.trendSymbolObj.date)
        dateTo.setDate(dateTo.getDate() + 15)
        let toDate = dateTo.toISOString().split("T")[0]
        // console.log(toDate + " " + typeof(toDate))
        // console.log(fromDate + " " + typeof(fromDate))
        let symbolId = this.trendSymbolObj.id
        // ------------------msgChart---------------------
        messages.Messages(fromDate , toDate , symbolId)
        .then(response => {
        // JSON responses are automatically parsed.
          this.msgChart = response.data
          // console.log("https://api.telebourse.ir/api/v1/telegram/stats?format=day&"+"from="+fromDate+"%2014:53:05&to="+toDate+"%2014:53:05&symbol_ids[]="+symbolId)
          // console.log(this.msgChart)
          let i
          for (i=0 ; i < this.msgChart.data.messages.length ; i++) {
            let keyItem = this.msgChart.data.messages[i].key.split(" ")[0]
            this.keys.push(keyItem)
            this.values.push(this.msgChart.data.messages[i].value)
          }
          // console.log(this.msgChart.data.messages)
          // console.log(this.keys)
          // console.log(this.values)
        })
        .catch(e => {
          this.errors.push(e)
        })
        // ------------------priceChart-------------------------
        // console.log(fromDate)
        // console.log('https://telebourse.ir/api/v1/symbols/'+ symbolId+'/trades?from='+fromDate+'%2000:00:00&to='+toDate+'%2000:00:00&format=day')
        prices.Prices(symbolId , fromDate , toDate)
        .then(response => {
        // JSON responses are automatically parsed.
          this.priceChart = response.data
          // console.log(this.priceChart)
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
      // tests() {
      //   console.log("test")
      // }
      // symbolinfo(id) {
      //   symbolinfo.SymbolInfo(id)
      //   .then(response => {
      //   // JSON responses are automatically parsed.
      //   this.symbolInfo = response.data
      //   console.log(this.symbolInfo)
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //   })
      // }
    },
    mounted: function () {
      if(this.trendSymbolObj !== null){
        symbolinfo.SymbolInfo(this.trendSymbolObj.id)
      .then(response => {
      // JSON responses are automatically parsed.
      
      this.symbolInfoo = response.data
      // this.f = true
      // console.log(this.symbolInfoo)
      })
      .catch(e => {
        this.errors.push(e)
      })
      }

    },
  }
</script>
<style>
.card:hover {
cursor: pointer;
}
.titleModal {
  font-weight: bold;
  color: rgb(22, 77, 52);
}
/* .imgBorder {
  border: 0.5vw solid #42b983;
  border-radius: 100%;
} */
</style>
