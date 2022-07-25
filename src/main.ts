import { defineSharedStyles } from 'lithen-super-element'
import { css } from 'lithen-tag-functions'

defineSharedStyles(css`
  * {
    margin: 0;
    box-sizing: border-box;
  }
`)

import('./root.js')
