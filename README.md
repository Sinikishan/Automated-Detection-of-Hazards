# Automated-Detection-of-Hazards
Nasa International Space Apps Challenge 2020: Inform - Automated Detection of Hazards                                                                    

https://2020.spaceappschallenge.org/challenges/inform/automated-detection-hazards/details


### Project Title

Automatic Dust Storm Detector(ADSD)


Project summary:

Dust Storms are nimble beasts of nature that destroy more than they restore, and our project helps to identify them in real time. It uses Stacking Ensemble using Deep Neural Networks
to train satellite images further tested on data acquired on our web interface from GIBS API in real time to predict whether or not the input image is a dust storm. Layered data such
as aerosol index and dust score are considered. The image is also passed through a K-Means segmentation model to estimate the areas affected by the dust storm. NLP is used to extract
possible mentions of locations from social media and predict dust storms in the requested area, and notifies in case it does predict there is one.

What we Developed?
```
We have developed an application that gives real time predictions of satellite data to predict the availability of dust storms in the image. This is followed by a depiction of the
area affected by the dust storm. In case of a dust storm being detected, a notification is sent to the users. It also uses social media as a tool to extract possible occurrences of
dust storms and predict the possibility of it being there, considering the location can be extracted.
```


Importance of it?
```
Dust storms have been wreaking havoc amongst humanity as well as flora and fauna by destroying crops, being the cause of aggravation in respiratory health issues  and decrease of the
overall Air Quality Index (AQI) of areas affected.Our application informs its users about dust storms occurring in real time, so they can be aware of any possible dust storm hazard 
in their locality and stay alert virtually. This is especially crucial for drivers who might be heading towards a dust storm, and could possibly avoid it. It also could alert people
with respiratory ailments to take the necessary precautions in time. 

```

What it does? 
```
It helps in detecting dust storms which are going to hit a particular region of the world by doing early prediction through classifying them against Aerosol,Dust Score and Corrected
reflectance ,after which it applies segmentation on the predicted data to know exact area of impact which is compared against population and vegetation data of the region. It also
sends a warning of hazard and holds historical prediction data.
```




How it works?
```
Image data is initially collected from the Global Imagery Browse Services (GIBS) archive using Worldview. In the image data each sample set is considered as a set of three images
with the respective layers::
Corrected Reflectance layer (True Color) - VIIRS Instrument, Suomi NPP satellite
Aerosol index image layer - OMI Instrument, Aura Satellite 
Dust Score Data layer - AIRS Instrument, Aqua Satellite

These images then go through general preprocessing functions followed by Data augmentation using DataAugment library which uses Bayesian Optimization to optimize the data augmentation hyperparameters. 
The images are then trained
These processed images are then trained on Stacking Ensemble which utilizes neural networks to classify the images into whether they are a dust storm or not. 
Images with the respective layers are now retrieved in real time using the GIBS API and those images are passed through the trained ensemble architecture to determine whether the 
image has a dust storm in it or not.
The image retrieved is then passed through a semantic segmentation algorithm using K-Means to segment the data so as to determine what area of land has been affected by the dust
storm.
Impact analysis is implemented where against survey data available, the population based on the population density of the retrieved area, vegetation and settlement is displayed with
the help of worldwide mapbox API, which gives a peek into the possible after effects of the storm.
Finally, the application alerts the users by notifying them of the hazard in the place as well as analyzing disaster related news and tweets using NLP fetching.
```



Further?
```
We are planning to implement localization to pinpoint the location of the dust storm, as well as use the real time data resources to predict where the dust storm is headed next based
on parameters such as wind speed and wind direction. We also hope to expand the implemented architecture into other parameters such as precipitation, radiation as well as look
further into how this affects biodiversity such as agriculture through thorough studies of soil moisture and carbon emission impacts of dust storms
Finally, we want to make this platform as efficient as possible so people everywhere need not have to worry about their safety in the event of dust storms.
```

#### Tools, Frameworks and Platforms used:

-Python,R                                                                                                                                                                         
-NodeJS
-Tensorflow & keras                                                                                     
-GIBS API                                                                               
-Mapbox API                                                             
-AWS


#### References: List the data and resources used

NASA Worldview 
https://worldview.earthdata.nasa.gov/

NASA Global Imagery Browse Services (GIBS)
https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs

GIBS API for Developers 
https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+API+for+Developers

API for Reverse Geocoding
https://developer.here.com/develop/rest-apis

For getting population of the region
https://qwikidata.readthedocs.io/en/stable/readme.html

#### Prediction Output:

![index](https://user-images.githubusercontent.com/15159619/95132607-af66fa00-077d-11eb-9d78-1ed2661cf492.jpg)
