import { initializeManager } from './manager'
import './style.css'

document.querySelectorAll('[data-multimedia-manager]').forEach(initializeManager)

window.__multimediaManager = {
    initializeManager
}
