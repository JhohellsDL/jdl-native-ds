import { HealthScreen, SleepScreen, WalletScreen } from '../src/screens';

export default { title: 'Pantallas/Demos' };

export const Salud = { render: () => <HealthScreen /> };
export const Billetera = { render: () => <WalletScreen /> };
export const Descanso = { render: () => <SleepScreen /> };
