import { Component } from '@angular/core';

declare var L;
declare var HeatmapOverlay;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data = {
    data: []
  };

  heatmapLayer = new HeatmapOverlay({
    radius: 2,
    maxOpacity: 0.8,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  });

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      this.heatmapLayer
    ],
    zoom: 4,
    center: L.latLng([ 17.4342067, 78.4051421 ])
  };

  dataFromAPI = {"status":"success","msg":"14 entities found","entities":[{"date_time":"2019-10-03 14:04:15UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":180,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4342067,78.4051421"]},"address":"","id":"2019-10-03 14:04:15UTC"},{"date_time":"2019-10-03 14:03:02UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":180,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.434309,78.4051505"]},"address":"","id":"2019-10-03 14:03:02UTC"},{"date_time":"2019-10-03 13:57:57UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":180,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.434207,78.4051257"]},"address":"","id":"2019-10-03 13:57:57UTC"},{"date_time":"2019-10-03 13:53:57UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":181,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4342069,78.4051232"]},"address":"","id":"2019-10-03 13:53:57UTC"},{"date_time":"2019-10-03 13:52:05UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":184,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4341756,78.4051209"]},"address":"","id":"2019-10-03 13:52:05UTC"},{"date_time":"2019-10-03 13:51:16UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":184,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4342053,78.4051252"]},"address":"","id":"2019-10-03 13:51:16UTC"},{"date_time":"2019-10-03 13:49:04UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":184,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4342228,78.4051433"]},"address":"","id":"2019-10-03 13:49:04UTC"},{"date_time":"2019-10-03 13:48:39UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":185,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4342078,78.4051232"]},"address":"","id":"2019-10-03 13:48:39UTC"},{"date_time":"2019-10-03 13:42UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":184,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4341714,78.4051186"]},"address":"","id":"2019-10-03 13:42UTC"},{"date_time":"2019-10-03 13:27UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":181,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.434211,78.4051866"]},"address":"","id":"2019-10-03 13:27UTC"},{"date_time":"2019-10-03 12:13UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":187,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4342163,78.4051339"]},"address":"","id":"2019-10-03 12:13UTC"},{"date_time":"2019-10-03 07:19UTC","tuner_locked_status":"0","elevation":"Pending","frequency":0,"bandwidth":6000000,"singnal_strength":0,"rssi":178,"ber":0,"snr":-1000,"location":{"type":"point","coordinates":["17.4343107,78.4050308"]},"address":"","id":"2019-10-03 07:19UTC"},{"date_time":"2019-09-26 10:01 am","tuner_locked_status":"success","elevation":"eval","frequency":65000000,"bandwidth":6500000,"rssi":-20,"ber":0,"snr":2700,"address":"a","location":{"type":"Point","coordinates":[17.448294,78.391487]},"id":"2019-09-26 10:01 am"},{"date_time":"2019-09-23 10:01 am","tuner_locked_status":"success","elevation":"eval","frequency":65000000,"bandwidth":6500000,"rssi":-20,"ber":0,"snr":2700,"address":"a","location":{"type":"Point","coordinates":[17.448294,78.391487]},"id":"2019-09-23 10:01 am"}]}



  onMapReady(map: L.Map) {
    this.data["data"] =  this.dataFromAPI.entities.map((datum)=>{
      if(datum.location.coordinates.length === 1){
        // @ts-ignore
        let res = datum.location.coordinates[0].split(',')
        return ({
        lat:parseFloat(res[0]),
        lng:parseFloat(res[1]),
        count: 1			
      })
      }else{
        return ({
        lat:datum.location.coordinates[0],
        lng:datum.location.coordinates[1],
        count: 1
      })
      }
    })
    console.log(this.data);
    
    debugger
    this.heatmapLayer.setData(this.data);
  }
}
