import UpcomingEvents from "./home/upcomig-events";
import DealsChart from "./home/deals-chart";

import UpcomingEventsSkeleton from "./skeleton/upcoming-events";
import AccordionHeaderSkeleton from "./skeleton/accordion-header";
import KanbanColumnSkeleton from "./skeleton/kanban";
import ProjectCardSkeleton from "./skeleton/project-card";
import LatestActivitiesSkeleton from "./skeleton/latest-activities";

import DashboardTotalCountCard from "./home/total-count-card";
import DashboardLatestActivities from "./home/latest-activities";




export {    UpcomingEvents, 
            DealsChart, 
            

            // Skeletons
            UpcomingEventsSkeleton, 
            AccordionHeaderSkeleton, 
            KanbanColumnSkeleton, 
            ProjectCardSkeleton, 
            LatestActivitiesSkeleton,
        
            DashboardTotalCountCard,
            DashboardLatestActivities,

        };

// Accordion

export * from "./accordion";

// Forms

export * from "./tasks/form/description"
export * from "./tasks/form/due-date"
export * from "./tasks/form/stage"
export * from "./tasks/form/title"
export * from "./tasks/form/users"
export * from "./tasks/form/header"

// Text

export * from "./text"

// User tag

export * from './tags/user-tag';