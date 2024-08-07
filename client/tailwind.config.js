/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import flowbite from 'flowbite/plugin'

export const content = ['./src/**/*.{js,jsx,ts,tsx}']
export const theme = {
  extend: {
    gridTemplateRows: {
      '[auto,auto,1fr]': 'auto auto 1fr'
    }
  }
}

export const plugins = [aspectRatio, forms, flowbite]
