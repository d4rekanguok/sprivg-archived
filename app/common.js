import { h, render } from 'https://unpkg.com/preact@latest?module';
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(h)

export { html, render, useEffect, useState }