"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource, DataProvider, fetchUtils } from "react-admin";

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

// Custom HTTP client to handle file uploads
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  if (options.body && typeof options.body === "string") {
    try {
      const body = JSON.parse(options.body);
      console.log("📦 Parsed body:", body);

      // Check if there's an image input value with a blob URL
      if (body.imageSrc && typeof body.imageSrc === "object" && body.imageSrc.src) {
        if (body.imageSrc.src.startsWith("blob:")) {
          console.log("🖼️ Found blob URL, fetching file...");
          
          // Fetch the blob and convert to File
          return fetch(body.imageSrc.src)
            .then(res => res.blob())
            .then(blob => {
              console.log("✅ Blob fetched:", blob.type, blob.size);
              
              const formData = new FormData();
              const file = new File([blob], body.imageSrc.title || "image.png", { type: blob.type });
              
              console.log("📁 Created File:", file.name, file.size);
              
              // Add all fields to FormData
              Object.keys(body).forEach(key => {
                if (key === "imageSrc") {
                  formData.append(key, file);
                  console.log("✅ Added file to FormData");
                } else if (body[key] !== null && body[key] !== undefined) {
                  formData.append(key, String(body[key]));
                  console.log(`➕ Added field ${key}:`, body[key]);
                }
              });

              const headers = new Headers(options.headers);
              headers.delete("Content-Type");

              console.log("🚀 Sending FormData request");
              return fetchUtils.fetchJson(url, {
                ...options,
                body: formData,
                headers,
              });
            })
            .catch(error => {
              console.error("❌ Error fetching blob:", error);
              throw error;
            });
        }
      }

      console.log("⚠️ No blob URL found, sending as JSON");
    } catch (e) {
      console.error("❌ Error parsing request body:", e);
    }
  }

  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider("/api", httpClient) as DataProvider;

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