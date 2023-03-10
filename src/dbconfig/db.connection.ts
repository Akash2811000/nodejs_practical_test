import { Pool } from 'pg';

const pool = new Pool({
    // max: 20,
    // //connectionString: 'postgres://root:newPassword@localhost:port/dbname',
    // connectionString: 'postgres://postgres:Radixweb8@postgres:5432/akash.gupta',
    // idleTimeoutMillis: 30000
    user: 'akash.gupta',
    host: 'localhost',
    database: 'akash.gupta',
    password: 'Radixweb8',
    port: 5432,
});

export default pool;