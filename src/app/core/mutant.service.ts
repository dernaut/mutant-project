import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MutantService {

  /**
   * Detecta si un humano es mutante basándose en su secuencia de ADN.
   * Un humano es mutante si tiene MÁS DE UNA secuencia de 4 letras iguales
   * en dirección horizontal, vertical u oblicua.
   *
   * Complejidad: O(N²) con early exit al encontrar la 2da secuencia.
   *
   * @param dna Array de strings que representan filas de la matriz NxN
   * @returns boolean — true si es mutante, false si es humano
   */
  isMutant(dna: string[]): boolean {
    return this.scan(dna);
  }

  scan(dna: string[]): boolean {
    const n = dna.length;
    let sequences = 0;
    const highlightedCells = new Set<string>();

    const directions: [number, number][] = [
      [0, 1],   // horizontal →
      [1, 0],   // vertical ↓
      [1, 1],   // diagonal ↘
      [1, -1],  // diagonal ↗
    ];

    outer:
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < dna[r].length; c++) {
        for (const [dr, dc] of directions) {
          const base = dna[r][c];
          const cells: string[] = [];
          let valid = true;

          for (let k = 0; k < 4; k++) {
            const nr = r + dr * k;
            const nc = c + dc * k;

            if (nr < 0 || nr >= n || nc < 0 || nc >= dna[nr].length) {
              valid = false;
              break;
            }
            if (dna[nr][nc] !== base) {
              valid = false;
              break;
            }
            cells.push(`${nr},${nc}`);
          }

          if (valid) {
            sequences++;
            cells.forEach(cell => highlightedCells.add(cell));

            // Cuando hay 2 secuencias es mutante
            if (sequences > 1) break outer;
          }
        }
      }
    }

    return sequences > 1;
  }


  /**
   * Valida que el ADN solo contenga bases nitrogenadas válidas (A, T, C, G)
   * y que todas las filas tengan la misma longitud (matriz NxN).
   */
  validate(dna: string[]): { valid: boolean; error: string } {
    if (dna.length < 4) {
      return { valid: false, error: 'Se necesitan al menos 4 filas de ADN' };
    }

    const n = dna[0].length;
    if (n < 4) {
      return { valid: false, error: 'Cada fila debe tener al menos 4 bases' };
    }

    const validBases = /^[ATCG]+$/;
    for (let i = 0; i < dna.length; i++) {
      if (dna[i].length !== n) {
        return { valid: false, error: `Fila ${i} tiene longitud diferente (se espera ${n})` };
      }
      if (!validBases.test(dna[i])) {
        return { valid: false, error: `Fila ${i} contiene bases inválidas (solo A, T, C, G)` };
      }
    }

    return { valid: true, error: '' };
  }
}
