import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'util-service'
})
@Injectable() export class UtilityService {
  posts: any;
  constructor() {
    this.posts= [{
      category: 'Brokerage Recommendations for 2018',
      title: 'Kotak Mahindra MF & Param Capital buy stake',
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec odio pellentesque, dictum ante quis, auctor nunc. Integer commodo diam quis justo tempus, a ullamcorper libero porta. Nunc ultrices dolor urna, id accumsan tellus laoreet quis. Praesent auctor, ipsum eget pellentesque posuere, felis nisl rhoncus dolor, ac rhoncus sem sem at felis. In hac habitasse platea dictumst. Sed in lectus lectus. Praesent non elementum magna. Nunc luctus urna a nibh rhoncus placerat. Vestibulum sit amet felis pellentesque, tincidunt nisl eget, viverra augue. Nulla facilisi. Nulla quis ornare nunc. Sed condimentum arcu sed urna luctus molestie. Donec auctor euismod vehicula. Nullam tempus viverra purus, eget molestie enim finibus eget. Cras quis augue iaculis, commodo quam ac, bibendum leo. Donec consequat finibus turpis, lacinia porttitor eros vehicula ac. Aenean pellentesque sem quis turpis ornare tempor. Maecenas finibus nisi tellus, sed aliquet magna eleifend vel. Mauris vel purus erat. Vivamus non velit orci. Nulla vel suscipit sem, ut ornare libero. Etiam consequat venenatis odio, fringilla suscipit sem sollicitudin ac. Vestibulum nec consequat nisl, at laoreet diam. Curabitur tincidunt vehicula nulla ultricies venenatis. Ut ultrices velit et interdum vestibulum. Nam dignissim consequat turpis ultricies ultrices. Integer a augue vitae ligula fermentum dignissim sed at felis.',
      imageSrc:'assets/imgs/kotak.jpeg',
      authorName: 'Arbind Roy',
      date: 'January, 01 2018'
    },
    {
      category: 'Portfolio cloning',
      title: 'Top 5 picks from edelweiss',
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec odio pellentesque, dictum ante quis, auctor nunc. Integer commodo diam quis justo tempus, a ullamcorper libero porta. Nunc ultrices dolor urna, id accumsan tellus laoreet quis. Praesent auctor, ipsum eget pellentesque posuere, felis nisl rhoncus dolor, ac rhoncus sem sem at felis. In hac habitasse platea dictumst. Sed in lectus lectus. Praesent non elementum magna. Nunc luctus urna a nibh rhoncus placerat. Vestibulum sit amet felis pellentesque, tincidunt nisl eget, viverra augue. Nulla facilisi. Nulla quis ornare nunc. Sed condimentum arcu sed urna luctus molestie. Donec auctor euismod vehicula. Nullam tempus viverra purus, eget molestie enim finibus eget. Cras quis augue iaculis, commodo quam ac, bibendum leo',
      imageSrc:'assets/imgs/logo.png',
      authorName: 'Arbind Roy',
      date: 'January, 02 2018'
    },
    {
      category: 'Portfolio cloning',
      title: 'Top 5 stocks from reliance securities',
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec odio pellentesque, dictum ante quis, auctor nunc. Integer commodo diam quis justo tempus, a ullamcorper libero porta. Nunc ultrices dolor urna, id accumsan tellus laoreet quis. Praesent auctor, ipsum eget pellentesque posuere, felis nisl rhoncus dolor, ac rhoncus sem sem at felis. In hac habitasse platea dictumst. Sed in lectus lectus. Praesent non elementum magna. Nunc luctus urna a nibh rhoncus placerat. Vestibulum sit amet felis pellentesque, tincidunt nisl eget, viverra augue. Nulla facilisi. Nulla quis ornare nunc. Sed condimentum arcu sed urna luctus molestie. Donec auctor euismod vehicula. Nullam tempus viverra purus, eget molestie enim finibus eget. Cras quis augue iaculis, commodo quam ac, bibendum leo',
      imageSrc:'assets/imgs/logo.png',
      authorName: 'Arbind Roy',
      date: 'January, 02 2018'
    },
    {
      category: 'Porinju Veliyath',
      title: 'One stock where Porinju Veliyath is buying shares',
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec odio pellentesque, dictum ante quis, auctor nunc. Integer commodo diam quis justo tempus, a ullamcorper libero porta. Nunc ultrices dolor urna, id accumsan tellus laoreet quis. Praesent auctor, ipsum eget pellentesque posuere, felis nisl rhoncus dolor, ac rhoncus sem sem at felis. In hac habitasse platea dictumst. Sed in lectus lectus. Praesent non elementum magna. Nunc luctus urna a nibh rhoncus placerat. Vestibulum sit amet felis pellentesque, tincidunt nisl eget, viverra augue. Nulla facilisi. Nulla quis ornare nunc. Sed condimentum arcu sed urna luctus molestie. Donec auctor euismod vehicula. Nullam tempus viverra purus, eget molestie enim finibus eget. Cras quis augue iaculis, commodo quam ac, bibendum leo',
      imageSrc:'assets/imgs/logo.png',
      authorName: 'Arbind Roy',
      date: 'January, 03 2018'
    }

    ];
  }

}
