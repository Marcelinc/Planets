import { celestialAxisInclination, celestialCircumference, celestialDensity, celestialName, celestialNaturalSatellites, celestialRotationPeriod, celestialType, description } from "./selectors";

var noDisplaying = true;

const displayDesc = () => {
    if(noDisplaying){
        description.style.opacity = 0;
        noDisplaying = false;
    } else{
        description.style.opacity = 1;
        noDisplaying = true;
    }
}

export const createDescription = (currentCelestial) => { 
    displayDesc();
    updateDescription(currentCelestial);
}

export const updateDescription = (celestial) => {
    celestialName.innerHTML = celestial.name;
    celestialType.innerHTML = 'Type: '+celestial.type;
    celestialCircumference.innerHTML = 'Circumference: '+celestial.circumference;
    celestialDensity.innerHTML = 'Density: '+celestial.density;
    celestialRotationPeriod.innerHTML = 'Rotation period: '+celestial.rotationPeriod;
    celestialAxisInclination.innerHTML = 'Axis inclination: '+celestial.axisInclination;
    celestialNaturalSatellites.innerHTML = 'Natural satellites: '+celestial.naturalSatellites;
}
