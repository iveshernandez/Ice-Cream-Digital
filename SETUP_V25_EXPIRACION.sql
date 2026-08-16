
-- V25 SETUP CON EXPIRACION
-- Ejecuta esto en Supabase SQL Editor (si ya tienes tabla, solo ejecuta los ALTER)

-- Crear tabla si no existe
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  plan TEXT DEFAULT 'pro',
  plan_days INT DEFAULT 30,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Si ya existe, agregar columnas nuevas (no da error si ya existen)
ALTER TABLE users ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'pro';
ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_days INT DEFAULT 30;
ALTER TABLE users ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Habilitar RLS y politica publica para que tu app funcione sin auth
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON users;
CREATE POLICY "Allow all" ON users FOR ALL USING (true) WITH CHECK (true);

-- Ver usuarios con dias restantes
SELECT username, plan, plan_days, expires_at, 
  CASE 
    WHEN expires_at IS NULL THEN 'Sin expiración'
    WHEN expires_at < NOW() THEN 'EXPIRADO'
    ELSE CONCAT(CEIL(EXTRACT(EPOCH FROM (expires_at - NOW()))/86400)::INT, ' días')
  END as dias_restantes,
  is_active
FROM users;
