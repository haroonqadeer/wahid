import { Component, OnInit } from '@angular/core';
import dayGridPlugin, { DayGrid } from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import bootstrapPlugin from '@fullcalendar/bootstrap';

declare var $: any;

@Component({
  selector: 'app-calenders',
  templateUrl: './calenders.component.html',
  styleUrls: ['./calenders.component.scss']
})
export class CalendersComponent implements OnInit {

  events: any[];
  options: any;


  constructor() { }

  ngOnInit() {

    this.events = [
      {
        "title": "All Day Event",
        "start": "2019-06-01",
        "color": "purple",
        "textColor": "white"
      },
      {
        "title": "Long Event",
        "start": "2019-06-07",
        "end": "2019-06-10",
        "color": "green",
        "textColor": "white"
      },
      {
        "title": "Repeating Event",
        "start": "2019-06-09T16:00:00",
        "textColor": "white"
      },
      {
        "title": "Repeating Event",
        "start": "2019-06-16T16:00:00",
        "textColor": "white"
      },
      {
        "title": "Conference",
        "start": "2019-06-11",
        "end": "2019-06-13",
        "textColor": "white"
      }
    ];

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin],
      defaultDate: '2019-06-01',
      // editable: true,
      selectable: true,
      // selectHelper: true,
      customButtons: {
        addEvent: {
          text: 'Add Event',
          click: function () {
            alert('ok');
          }
        }
      },
      header: {
        left: 'prev,next, today, addEvent',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      buttonIcons: {
        prev: 'left-single-arrow',
        next: 'right-single-arrow'
      },
      // buttonText: {
      //   addEvent: 'Add Event'
      // },
      themeSystem: 'bootstrap'
      // eventLimit: true,
    };
  }

}
