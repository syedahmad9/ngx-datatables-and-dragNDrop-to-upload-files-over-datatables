import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { map, debounceTime, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from "rxjs";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('search', { static: false }) search: any;
  @ViewChild('fileType', { static: false }) fileType: any;

  files: any[] = [];
  fileOver: boolean;
  name = 'Ngx Datatables Filter All Columns';
  public temp: Array<object> = [];
  public rows: Array<object> = [];
  public columns: Array<object>;
  selectedVal = '';
  searchText = '';
  isDataLoaded = true;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() { 
    // Initial columns, can be used for data list which is will be filtered
    this.columns = [
      { prop: 'name', flexGrow: '4' }, 
      { prop: 'company', name: 'Company', flexGrow: '4' }, 
      { prop: 'gender', name: 'Gender', flexGrow: '1' },
      { prop: 'age', name: 'Age', flexGrow: '1' }
    ];
    this.getDataJson();
    // this.findAll();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value, this.selectedVal);
      });
    fromEvent(this.fileType.nativeElement, 'change')
      .pipe(
        debounceTime(550),
        map(x => {console.log(x['target']['value']); return x['target']['value']})
        
      )
      .subscribe(value => {
        console.log(value)
        this.updateFilter(this.searchText, value);
      });
  }

updateFilter(val: any, ext) {
    const value = val.toString().toLowerCase().trim();
    if (ext == 'Select'){ ext= ''}
    console.log('start filter',value, ext);
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable
    this.rows = this.temp.filter(item => {
      // iterate through each row's column data
      console.log('Name: ', item['name'])
      console.info('gender', item['gender'])
      console.log(item['name']
              .toString()
              .toLowerCase()
              .indexOf(value), 'va:'+ value)
      
        if (value && ext){
          if(
          ((item['name']
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
           !value) &&
          ((item['gender']
              .toString()
              .toLowerCase() === ext) ||
           ext === '')
        ) {
          console.info('Filter 1')
          // found match, return true to add to result set
          return true;
        } 
        } else if (value && !ext){
          if(
          ((item['name']
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
           !value)
        ) {
          console.info('Filter 2')
          // found match, return true to add to result set
          return true;
        }
        } else if (!value && ext){
          if(
          ((item['gender']
              .toString()
              .toLowerCase() === ext) ||
           !value)
        ) {
          console.info('Filter 3')
          // found match, return true to add to result set
          return true;
        }
        }
        
    });
     console.log('end filter',value, ext);

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  updateFilter2(val: any, ext) {
    const value = val.toString().toLowerCase().trim();
    console.log('start filter',value, ext);
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable
    this.rows = this.temp.filter(item => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        
      console.info(i);
        if (
          (item[keys[i]] &&
            (item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value) &&
          (item[keys[i]] &&
            (item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(ext) !== -1) ||
          !ext)
        ) {
          console.info('true')
          console.info(item[keys[i]]
              .toString())
          // found match, return true to add to result set
          return true;
        }else if (item[keys[i]]) {
          console.info('false')
          console.info(item[keys[i]]
              .toString())
        }
      }
    });
     console.log('end filter',value, ext);

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  findAll() {
   this.httpClient.get('./assets/data/company.json').subscribe(
      (data: any) => {
        // cache our list
        this.temp = data;

        // push our inital complete list
        this.rows = [...this.temp];
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  findAlltemp() {
   return this.httpClient.get('./assets/data/company.json').pipe(map(
      (data: any) => {
        // cache our list
        this.temp = data;

        // push our inital complete list
        this.rows = [...this.temp];
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    ));
  }

  getDataJson() {
    this.rows = this.temp = [
      {
        "name": "Ethel Price",
        "gender": "female",
        "company": "Johnson, Johnson and Partners, LLC CMP DDC",
        "age": 22
      },
      {
        "name": "Claudine Neal",
        "gender": "female",
        "company": "Sealoud",
        "age": 55
      },
      {
        "name": "Beryl Rice",
        "gender": "female",
        "company": "Velity",
        "age": '67'
      },
      {
        "name": "Wilder Gonzales",
        "gender": "male",
        "company": "Geekko"
      },
      {
        "name": "Georgina Schultz",
        "gender": "female",
        "company": "Suretech"
      },
      {
        "name": "Carroll Buchanan",
        "gender": "male",
        "company": "Ecosys"
      },
      {
        "name": "Valarie Atkinson",
        "gender": "female",
        "company": "Hopeli"
      },
      {
        "name": "Schroeder Mathews",
        "gender": "male",
        "company": "Polarium"
      },
      {
        "name": "Lynda Mendoza",
        "gender": "female",
        "company": "Dogspa"
      }
    ];
  } 
  
  onFileDragging($event) {
    console.log($event);
    this.fileOver = $event;
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    console.log($event)
    this.fileOver = $event.fileOver;
    this.prepareFilesList($event.files);
  }

  /**
   * handle file from browsing
   */
  async fileBrowseHandler(files) {
    await this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  async prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      console.log('file upload', item.name);
      this.upload(item)
      .then(x => console.log('upload then', x)).catch(err=> console.log('error', err))
      // try{await this.upload(item)} catch(err) {console.log(err)}
      console.log('upload end', item.name);
    }
    //this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  uploadfile(formData){
    return this.findAlltemp()
        .pipe(mergeMap(res=> {
          return this.httpClient
          .post("yout-url-here", formData, {
            reportProgress: true,
            observe: "events"
          })
          .pipe(catchError((err: any) => {
              // alert(err.message);
              console.log('i', err.message)
              return throwError(err.message);
            }));
          }),catchError((err: any) => {
            // alert(err.message);
              console.log('o', err.message)
            return throwError(err.message); 
          }));
  }
  upload(file) {
      file.progress = 1;
      const formData = new FormData();
      formData.append("file", file);
      console.log('upload start', file.name);
      return this.uploadfile(formData)
        .pipe(
          map((event: any) => {
            if (event.type == HttpEventType.UploadProgress) {
              file.progress = Math.round((100 / event.total) * event.loaded);
              console.log(event.type, file.progress)
            } else if (event.type == HttpEventType.Response) {
              file.progress = null;
              console.log(event.type, file.progress)
            }
            
          }),
          catchError((err: any) => {
            file.progress = null;
            // alert(err.message);
            return throwError(err.message);
          })
        ).toPromise()
    }
}
