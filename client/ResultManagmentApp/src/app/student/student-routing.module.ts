import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchResultComponent } from "./components/search-result/search-result.component";
import { ResultPageComponent } from "./components/result-page/result-page.component";

const routes: Routes = [
    { path: 'student/searchresult', component: SearchResultComponent },
    { path: 'student/result', component: ResultPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StudentRoutingModule {

}

