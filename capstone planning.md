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




Material UI
find API
redux?

Apis
https://api-ninjas.com/api/exercises
https://spoonacular.com/food-api







to do:
design dashboard
profile page - upload image - make nicer
tracking workouts - make nicer and functional
landing page - modal of people exercising video? cool animation
add paypal thing?
login - reset password?
graphs for tracking = see progress

Table -
tone up - cardio 1 per day
move API key to custom environment
mobility - recommendations change to reps not cardio

Dashboard
progress tracking - graph of some sort displaying workouts completed

Nav bar
workout plan 
User profile - picutre, name, details like age - weight height and goals - change goal achievment badges - workouts completed etc. + notifcations of encouragement
dashboard say - welcome user!

exercise library - switch exercises to your plan? with filtering?

Workout history / tracking - show adherence track weight / reps for strength. track resistance/incline + speed for cardio



store goal and fitness level in backend not local storage 

stuff used;
jwt password hashing
youtube API fetch
exercise API


in future:
nutrition stuff if time + mobile response