import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { SelectAsyncDs } from "projects/zorro-sharper/src/public-api";

@Component({
  selector: "app-select-async-ds.component",
  templateUrl: "./select-async-ds.component.html",
  styles: [
    `
      .loading-icon {
        margin-right: 8px;
      }
    `
  ]
})
export class SelectAsyncDsComponent implements OnInit {
  // 异步下拉框数据源
  userDs = new SelectAsyncDs((pageNum, pageSize, query) =>
    this.getUserList(pageNum, pageSize, query)
  );

  getUserList(pageNum, pageSize, query): Observable<string[]> {
    return this.http.get(`${this.randomUserUrl}`).pipe(map((res: any) => res.results));
  }

  randomUserUrl = "https://api.randomuser.me/?results=10";
  selectedUser = null; // 当前选中项

  ngOnInit(): void {
    // 假设是编辑数据的情况，模拟需要加载默认的当前选中值
    var user = {
      name: {
        title: "王明阳"
      },
      login: {
        uuid: "c4168eac-84b8-46ea-b735-c9da9bfb97fd"
      }
    };
    this.selectedUser = user.login.uuid;

    this.userDs.reload().subscribe(() => {
      this.userDs.appendOption(user, d => d.login.uuid);
    });
  }

  constructor(private http: HttpClient) {}
}
