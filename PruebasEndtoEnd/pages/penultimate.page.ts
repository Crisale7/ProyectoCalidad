import { expect, Locator, Page } from '@playwright/test';

export class Penultimate {
    readonly penultimate: Locator;
    readonly desplegable: Locator;
    readonly priority: Locator;
    readonly penultimateText: Locator;

    constructor(page: Page) {
        this.penultimate = page.locator('#mainItemList > li:nth-last-child(2)');
        this.desplegable = this.penultimate.locator('td.ItemIndicator img.ItemMenu');
        this.priority = page.locator('#Div1 > span:nth-child(1)');
        this.penultimateText = this.penultimate.locator('.ItemContentDiv');
    }
    // Función para mantener el mouse encima de penultimate
    async hoverOverPenultimate() {
        await this.penultimate.hover();
        console.log('Mouse colocado sobre el penúltimo elemento.');
    }

    // Función para hacer clic en desplegable dentro del penúltimo
    async clickDesplegable() {
        await this.desplegable.click();
        console.log('Click realizado en el desplegable del penúltimo elemento.');
    }

    // Función para hacer clic en prioridad
    async clickPriority() {
        await this.priority.click();
        console.log('Click realizado en la prioridad 1 del penúltimo elemento.');
    }

// Verificar que el texto del penúltimo elemento cambie a color rojo
async verifyPenultimateTextColorIsRed() {
    // Obtener el color inicial
    const initialColor = await this.penultimate.locator('.ItemContentDiv').evaluate((element) => {
        return window.getComputedStyle(element).color;
    });

    // Mostrar el color inicial en la consola
    console.log('Color inicial del texto:', initialColor);

    // Esperar 5 segundos
    await this.penultimate.page().waitForTimeout(5000);
    console.log('Esperando 5 segundos antes de verificar el color final.');

    // Realizar la verificación del color final (rojo)
    const finalColor = await this.penultimate.locator('.ItemContentDiv').evaluate((element) => {
        return window.getComputedStyle(element).color;
    });

    // Comprobar si el color final es rojo
    expect(finalColor).toBe('rgb(255, 51, 0)');
    console.log('El texto del penúltimo elemento cambió correctamente a color rojo.');
}



    
}
