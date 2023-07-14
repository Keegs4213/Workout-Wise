Capstone planning

Figma planning

Documentation

Slides

Code

List of requirements:

1. User Authentication:

Register new users (collect necessary details like name, email, password, etc.).
Login for returning users.
Forget/Reset password functionality. 2. User Profile:

Display user information.
Allow users to edit/update their profile.
Show user's historical workout data, progress towards goals, etc. 3. Goal Setting:

Allow users to set personal fitness goals, such as weight loss/gain, strength building, improving cardio health, etc.
Enable goal tracking and progress visualization. 4. Workout Plans:

Generate personalized workout plans based on the user's goals.
Allow users to customize their workout plans (change exercises, duration, etc.).
Provide different categories/types of workouts like Cardio, Strength, Yoga, etc. 5. Exercise Library: - workout split recommended depending on goals

A comprehensive database of exercises with descriptions and instructions (preferably with pictures or videos).
Allow users to search for specific exercises based on type, muscle group, equipment, etc. 6. Nutrition tracking: - water, weight tracking?

Allow users to log their daily food and beverage intake.
Calculate and track macro and micro-nutrient intake (like proteins, carbs, fats, vitamins, etc.).
Provide a database of foods with nutritional info. 7. Meal Plan and Recommendations:

Suggest daily/weekly meal plans based on user's nutritional needs and fitness goals.
Provide healthy recipes and cooking tips.
Recommendations for what to eat before/after workouts. 8. Community:

Allow users to share their progress, workouts, and meals with friends or the public.
Provide a platform for users to ask questions, share tips, and get advice. 9. Notifications/Reminders: - some sort of encouragement , ticking off goals / workouts

Send notifications to users for workout reminders, goal progress, etc.
Implement daily/weekly reminders to log nutrition and workouts. 10. Integration with other devices:

Sync data with wearable devices like smartwatches for better activity tracking.
Integrate with other health apps (like Google Fit or Apple Health) to import/export data.
These features provide a robust framework for a comprehensive workout companion app. You can choose to implement all of them or pick and choose based on your project scope and time constraints. Additionally, prioritize features based on user needs and business value. Remember, it's important to plan thoroughly before diving into development, and to take time for proper testing and refinements after initial implementations.

Docuemntation/Powerpoint
Define- what is the problem

It is intimidating to begin working out when you don't really know what you're doing. This app is going to help all those
The main idea with this app is that there is no one set path to achieving your fitness goals. Everyone has different goals and there are different ways to reach their goals. One plan might work better for one person and not be beneficial to another depending on effort, consistency and execution.

design the solution ---

architecture diagram - building blocks of design and how users interact with product

user flow - steps user may take in interacting with the software

wireframe design - figma design user interface

deliver

Figma design

Git branches

ADobe firefly for goal images
chatgpt image ai for website logo?

look at food/nutrition apis
workout apis

CRUD users

Material UI
find API
redux?

Apis
https://api-ninjas.com/api/exercises
https://spoonacular.com/food-api

take into account dietary requirements - allergens

dashboard - ringlet tracker - steps? weight? + water intake or graph instead of ringlet

workout page - workout plan - tracking of some sort
nutrition page - plan + tracking
profile page - edit profile + set photo and settings


to do:
Workout plan page - click on specific exercise for demo?
fitnessLevel change colour when hovered
make loading screen between pages that need it
after fitnessLevel - clickable generate workout plan button - loading screen
split workout plan into day 1, day 2 etc. show sets + reps?
generate plan page - make it nice table and show descriptions, details etc. - demo?
split workout plan into days etc.
design dashboard
profile page - upload image
tracking workouts 
generate plan page - proceed to dashboard button 

make sure client healthy to train on signup
add paypal thing

Dashboard nav bar at bottom 



landing page - modal of people exercising video? cool animation 

nutrition stuff if time




if cardio - fetch one exercise per day 
heart rate 120-140bpm instead of km/hr 
beginner 15-20 mins intermediate 30mins expert 45 mins - 1 hr


table - move type and difficulty to outside table -at top so shows what type of workout plan
add other info into table to replace 
do muscle .toUpperCase() and make middle_back Middle back


stuff used;
jwt password hashing

