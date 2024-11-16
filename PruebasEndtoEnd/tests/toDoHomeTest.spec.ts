import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page.ts';
import { Penultimate } from '../pages/penultimate.page.ts';
import { Second } from '../pages/second.page.ts';

// Función para generar datos aleatorios
function generarDatosAleatorios() {
    const randomString = Math.random().toString(36).substring(2, 8);
    const username = `User_${randomString}`;
    const email = `${randomString}@example.com`;
    const password = `Pass_${randomString}`;
    return { username, email, password };
}

test.beforeEach(async ({ page }) => {
    await page.goto('http://todo.ly/');
});

test('Registrar nuevo usuario e interactuar con penúltimo y desplegable', async ({ page }) => {
    const homePage = new ToDoHomePage(page);
    const penultimate = new Penultimate(page);
    const { username, email, password } = generarDatosAleatorios();

    // Registro de un nuevo usuario
    await homePage.clickOnSignUpFree();
    await homePage.llenarDatosNuevoUsuario(username, email, password);
    await homePage.guardarNuevoUsuario();

    // Interacción con penúltimo y desplegable para priorizar
    await penultimate.hoverOverPenultimate();
    await penultimate.clickDesplegable();
    await penultimate.clickPriority();
    // Verificar que el texto del penúltimo cambió a color rojo
    await penultimate.verifyPenultimateTextColorIsRed();
    
});

test('Registrar nuevo usuario e interactuar con segundo y elminar', async ({ page }) => {
    const homePage = new ToDoHomePage(page);
    const second = new Second(page);
    const { username, email, password } = generarDatosAleatorios();

    // Registro de un nuevo usuario
    await homePage.clickOnSignUpFree();
    await homePage.llenarDatosNuevoUsuario(username, email, password);
    await homePage.guardarNuevoUsuario();

    // Interacción con segundo y desplegable para eliminar
    await second.hoverOverSecond();
    await second.clickDesplegable();
    await second.clickDelete();
    await second.verifyItemCountDecreased();
});

