import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page.ts';
import { Penultimate } from '../pages/penultimate.page.ts';
import { Second } from '../pages/second.page.ts';

function generarDatosAleatorios() {
    const randomString = Math.random().toString(36).substring(2, 8);
    const username = `User_${randomString}`;
    const email = `${randomString}@example.com`;
    const password = `Pass_${randomString}`;
    return { username, email, password };
}

test.beforeEach(async ({ page }) => {
    await page.goto('http://todo.ly/');
    await page.waitForLoadState('networkidle');
    console.log('Todos los componentes de la página han cargado.');
});

test('Registrar nuevo usuario e interactuar con penúltimo y desplegable', async ({ page }) => {
    const homePage = new ToDoHomePage(page);
    const penultimate = new Penultimate(page);
    const { username, email, password } = generarDatosAleatorios();

    await homePage.clickOnSignUpFree();
    await homePage.llenarDatosNuevoUsuario(username, email, password);
    await homePage.guardarNuevoUsuario();

    await penultimate.hoverOverPenultimate();
    await penultimate.clickDesplegable();
    await penultimate.clickPriority();
    await penultimate.verifyPenultimateTextColorIsRed();
});

test('Registrar nuevo usuario e interactuar con segundo y eliminar', async ({ page }) => {
    const homePage = new ToDoHomePage(page);
    const second = new Second(page);
    const { username, email, password } = generarDatosAleatorios();

    await homePage.clickOnSignUpFree();
    await homePage.llenarDatosNuevoUsuario(username, email, password);
    await homePage.guardarNuevoUsuario();

    await second.hoverOverSecond();
    await second.clickDesplegable();
    await second.clickDelete();
    await second.verifyItemCountDecreased();
});
