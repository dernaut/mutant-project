import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MutantService } from '../../core/mutant.service';

@Component({
  selector: 'app-adn-scanner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adn-scanner.html',
  styleUrl: './adn-scanner.css',
})
export class AdnScanner {
  private mutantService = inject(MutantService);

  dnaSequence = signal('');
  dnaRows = signal<string[]>([]);

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cleanValue = input.value.toUpperCase().replace(/[^ATCG]/g, '').slice(0, 6);
    this.dnaSequence.set(cleanValue);
    input.value = cleanValue;
  }

  addRow() {
    const current = this.dnaSequence();
    if (current.length === 6 && this.dnaRows().length < 6) {
      this.dnaRows.update(rows => [...rows, current]);
      this.dnaSequence.set('');

      if (this.dnaRows().length === 6) {
        setTimeout(() => this.processDNA(), 300);
      }
    }
  }

  removeRow(index: number) {
    this.dnaRows.update(rows => rows.filter((_, i) => i !== index));
  }

loadExample(type: 'human' | 'mutant') {
  const mutantExample = [
    'ATGCGA',
    'CAGTGC',
    'TTATGT',
    'AGAAGG',
    'CCCCTA',
    'TCACTG'
  ];

  const humanExample = [
    'ATGCGA',
    'CAGTGC',
    'TTATTT',
    'AGACGG',
    'GCGTCA',
    'TCACTG'
  ];

  const selected = type === 'mutant' ? mutantExample : humanExample;

  this.dnaRows.set(selected);
  this.dnaSequence.set('');

  console.log(`Cargado ejemplo de ${type}`);
}

  processDNA() {
    const matrix = this.dnaRows();
    const isMutant = this.mutantService.isMutant(matrix);

    if (isMutant) {
      alert('🧬 ¡ALERTA! ADN MUTANTE DETECTADO');
    } else {
      alert('👤 Humano detectado. No se hallaron genes mutantes.');
    }

    this.dnaRows.set([]); // Reiniciar matriz
  }
}
