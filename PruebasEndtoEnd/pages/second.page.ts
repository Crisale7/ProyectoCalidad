import { expect, Locator, Page } from '@playwright/test';

export class Second {
    readonly page: Page;
    readonly second: Locator;
    readonly desplegable: Locator;
    readonly delete: Locator;

    constructor(page: Page) {
        this.page = page;
        this.second = page.locator('#mainItemList > li:nth-child(2)');
        this.desplegable = this.second.locator('td.ItemIndicator img.ItemMenu');
        this.delete = page.locator('#itemContextMenu > li.delete.separator > a');
    }

    async hoverOverSecond() {
        await this.second.waitFor({ state: 'visible' });
        await this.second.hover();
        console.log('Mouse colocado sobre el Segundo elemento.');
    }

    async clickDesplegable() {
        await this.desplegable.waitFor({ state: 'visible' });
        await this.desplegable.click();
        console.log('Click realizado en el desplegable del Segundo elemento.');
    }

    async clickDelete() {
        await this.delete.waitFor({ state: 'visible' });
        await this.delete.click();
        console.log('Click realizado en delete.');
    }

    async verifyItemCountDecreased() {
        // Seleccionar todos los elementos directos de la lista principal
        const items = this.page.locator('#mainItemList > li');
    
        // Asegurarse de que la lista esté visible antes de realizar el conteo inicial
        await items.first().waitFor({ state: 'visible', timeout: 10000 });
    
        // Contar el número inicial de elementos
        const initialCount = await items.count();
        console.log('Número inicial de elementos en la lista principal:', initialCount);
    
        // Esperar hasta que el número de elementos cambie
        await this.page.waitForFunction(
            ({ selector, initialCount }) => {
                const elements = document.querySelectorAll(selector);
                return elements.length < initialCount;
            },
            { selector: '#mainItemList > li', initialCount }, // Pasamos un solo objeto como argumento
            { timeout: 30000 } // Opciones de espera
        );
    
        // Contar el número final de elementos
        const finalCount = await items.count();
        console.log('Número final de elementos en la lista principal:', finalCount);
    
        // Verificar que haya un elemento menos
        expect(finalCount).toBe(initialCount - 1);
        console.log('La lista principal tiene un elemento menos después de la eliminación.');
    }
    
    
    
}
