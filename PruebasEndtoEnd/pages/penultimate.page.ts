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

    async hoverOverPenultimate() {
        await this.penultimate.waitFor({ state: 'visible' });
        await this.penultimate.hover();
        console.log('Mouse colocado sobre el penúltimo elemento.');
    }

    async clickDesplegable() {
        await this.desplegable.waitFor({ state: 'visible' });
        await this.desplegable.click();
        console.log('Click realizado en el desplegable del penúltimo elemento.');
    }

    async clickPriority() {
        await this.priority.waitFor({ state: 'visible' });
        await this.priority.click();
        console.log('Click realizado en la prioridad 1 del penúltimo elemento.');
    }

    async verifyPenultimateTextColorIsRed() {
        console.log('Esperando que el color del texto cambie a rojo...');
    
        // Usar `waitForFunction` pasando una función que interactúe con el elemento directamente
        const isColorRed = await this.penultimateText.page().waitForFunction(
            (locator) => {
                const element = locator;
                if (!element) return false; // Continúa esperando si el elemento no está disponible
                const color = window.getComputedStyle(element).color;
                return color === 'rgb(255, 51, 0)'; // Color rojo esperado
            },
            await this.penultimateText.elementHandle(), // Pasar el `elementHandle` del Locator
            { timeout: 20000 } // Tiempo de espera ajustado
        );
    
        if (isColorRed) {
            console.log('El texto del penúltimo elemento cambió correctamente a color rojo.');
        } else {
            throw new Error('El texto del penúltimo elemento no cambió a color rojo.');
        }
    }
    
    
    
}
