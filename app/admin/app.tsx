"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";

import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";
import { ChallengeList } from "./challenge/list";
import { ChallengeOptionCreate } from "./challengeOption/create";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeOptionsList } from "./challengeOption/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { CourseList } from "./course/list";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";
import { LessonList } from "./lesson/list";
import { UnitCreate } from "./unit/create";
import { UnitEdit } from "./unit/edit";
import { UnitList } from "./unit/list";
import { DailyTipCreate } from "./dailyTip/create";
import { DailyTipEdit } from "./dailyTip/edit";
import { DailyTipList } from "./dailyTip/list";

import { LessonModuleList } from "./lessonModule/list";
import { LessonModuleCreate } from "./lessonModule/create";
import { LessonModuleEdit } from "./lessonModule/edit";

import { UnitDetailList } from "./unitDetail/list";
import { UnitDetailCreate } from "./unitDetail/create";
import { UnitDetailEdit } from "./unitDetail/edit";

const dataProvider = simpleRestProvider("/api") as any;

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />

      <Resource
        name="units"
        recordRepresentation="title"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />

      <Resource
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />

      <Resource
        name="challenges"
        recordRepresentation="question"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />

      <Resource
        name="challengeOptions"
        recordRepresentation="text"
        list={ChallengeOptionsList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        options={{
          label: "Challenge Options",
        }}
      />

      <Resource
        name="dailyTips"
        recordRepresentation="title"
        list={DailyTipList}
        create={DailyTipCreate}
        edit={DailyTipEdit}
        options={{
          label: "Daily Tips",
        }}
      />

      <Resource
        name="lessonModules"
        list={LessonModuleList}
        create={LessonModuleCreate}
        edit={LessonModuleEdit}
        recordRepresentation="title"
        options={{ label: "Lesson Modules" }}
      />

      <Resource
        name="unitDetails"
        list={UnitDetailList}
        create={UnitDetailCreate}
        edit={UnitDetailEdit}
        recordRepresentation="title"
        options={{ label: "Unit Details" }}
      />
    </Admin>
  );
};

export default App;