// Global components registration
// In Vue 3, global components should be registered on the app instance.
// This file can export a plugin or function to register components.

import Checkbox from './utils/fields/Checkbox'
import DateField from './utils/fields/DateField'
import InputField from './utils/fields/InputField'
import AlertElement from './utils/misc/Alert'
import Button from './utils/misc/Button'
import ValorationCard from './utils/misc/ValorationCard'
import Tag from './utils/misc/Tag'
import ItemCard from './utils/misc/ItemCard'
import RecommendationCard from './utils/misc/RecommendationCard'
import PreferenceCard from './utils/misc/PreferenceCard'
import SelectField from './utils/fields/SelectField'
import TextAreaField from './utils/fields/TextAreaField'
import Picture from './utils/misc/Picture'

export default {
  install(app) {
    app.component('checkbox', Checkbox);
    app.component('date-field', DateField);
    app.component('input-field', InputField);
    app.component('alert', AlertElement);
    app.component('btn', Button);
    app.component('valoration-card', ValorationCard);
    app.component('tag', Tag);
    app.component('item-card', ItemCard);
    app.component('recommendation-card', RecommendationCard);
    app.component('preference-card', PreferenceCard);
    app.component('select-field', SelectField);
    app.component('text-area-field', TextAreaField);
    app.component('pic', Picture);
  }
}
