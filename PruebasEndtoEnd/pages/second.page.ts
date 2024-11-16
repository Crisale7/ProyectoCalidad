import { expect, Locator, Page } from '@playwright/test';

export class Second {
    readonly page: Page;
    readonly second: Locator;
    readonly desplegable: Locator;
    readonly delete: Locator;

    constructor(page: Page) {
        this.page = page; // Inicializamos el objeto `page`
        this.second = page.locator('#mainItemList > li:nth-child(2)');
        this.desplegable = this.second.locator('td.ItemIndicator img.ItemMenu'); // Selección dentro del penúltimo
        this.delete = page.locator('#itemContextMenu > li.delete.separator > a'); 
    }

    // Función para mantener el mouse encima del penúltimo elemento
    async hoverOverSecond() {
        await this.second.hover();
        console.log('Mouse colocado sobre el penúltimo elemento.');
    }

    // Función para hacer clic en desplegable dentro del penúltimo elemento
    async clickDesplegable() {
        await this.desplegable.click(); // Ahora restringido al contexto del penúltimo
        console.log('Click realizado en el desplegable del penúltimo elemento.');
    }

    // Función para hacer clic en "delete"
    async clickDelete() {
        await this.delete.click();
        console.log('Click realizado en delete.');
    }

    // Verificación de que el conteo de elementos en la lista ha disminuido
    async verifyItemCountDecreased() {
        // Seleccionar todos los elementos directos de la lista principal
        const items = this.page.locator('#mainItemList > li');

        // Esperar a que la lista esté visible
        await items.first().waitFor({ state: 'visible', timeout: 5000 });

        // Contar el número inicial de elementos
        const initialCount = await items.count();
        console.log('Número inicial de elementos en la lista principal:', initialCount);

        // Esperar 5 segundos después de la eliminación
        await this.page.waitForTimeout(5000);
        console.log('Esperando 5 segundos después de la eliminación.');

        // Contar el número final de elementos
        const finalCount = await items.count();
        console.log('Número final de elementos en la lista principal:', finalCount);

        // Verificar que haya un elemento menos
        expect(finalCount).toBe(initialCount - 1);
        console.log('La lista principal tiene un elemento menos después de la eliminación.');
    }
}
