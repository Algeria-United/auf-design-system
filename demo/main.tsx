import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import arEG from 'antd/locale/ar_EG';
import { Button, Drawer, Input, Modal, Segmented, Select, Space } from 'antd';
import {
  AppstoreOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, FireOutlined, HomeOutlined,
  PlusOutlined, SettingOutlined, TeamOutlined,
} from '@ant-design/icons';
import {
  AppShell, Badge, ColorDot, DataTable, DesignSystemProvider, EmptyState, FilterBar, GlassCard, KpiCard, KpiRow,
  PageHeader, ProgressBar, StatusTag, TabsBar, UserAvatar, brand, drawerProps, radius, tones, type Tone,
} from '../dist/index.js';
import '../dist/styles.css';

// Every component with SAMPLE data only (no real people, no keys, no network).
type Row = { id: string; name: string; owner: string; due: string; status: Tone; label: string; progress: number };
const rows: Row[] = [
  { id: '1', name: 'تقرير النشاط الشهري', owner: 'عضو أ', due: '24/10/2026', status: 'success', label: 'منجزة', progress: 100 },
  { id: '2', name: 'تصميم ملصق الحملة', owner: 'عضو ب', due: '27/10/2026', status: 'warning', label: 'قيد الإنجاز', progress: 60 },
  { id: '3', name: 'تحضير القاعة', owner: 'عضو ج', due: '20/10/2026', status: 'danger', label: 'متأخرة', progress: 30 },
  { id: '4', name: 'جرد المستودع', owner: 'عضو د', due: '02/11/2026', status: 'neutral', label: 'للإنجاز', progress: 0 },
];

function Demo() {
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState('ar');
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const [flash, setFlash] = useState<string>();
  return (
    <AppShell
      sectionTitle="منظومة تجريبية"
      nav={[
        { key: 'home', label: 'لوحة التحكم', icon: <HomeOutlined /> },
        { key: 'tasks', label: 'المهام', icon: <AppstoreOutlined /> },
        { key: 'calendar', label: 'الرزنامة', icon: <CalendarOutlined /> },
        { key: 'people', label: 'الأعضاء', icon: <TeamOutlined /> },
        { key: 'settings', label: 'الإعدادات', icon: <SettingOutlined /> },
      ]}
      selectedKey={page}
      onNavigate={setPage}
      user={{ name: 'مستخدم تجريبي', role: 'مسؤول', avatarIndex: 2 }}
      onLogout={() => undefined}
      languages={[{ value: 'ar', label: 'ع' }, { value: 'fr', label: 'FR' }]}
      language={lang}
      onLanguageChange={setLang}
      topbarExtra={<span className="auf-avatar-stack">{['أ', 'ب', 'ج'].map((n, i) => <UserAvatar key={n} name={n} index={i} size={28} online />)}</span>}
      storageKey="auf-ds-demo.sidebar"
    >
      <PageHeader
        title="مكوّنات التصميم"
        crumbs={[{ label: 'الرئيسية', href: '#' }, { label: 'مكوّنات التصميم' }]}
        subtitle="كل المكوّنات ببيانات تجريبية"
        actions={<><Button onClick={() => setDrawer(true)}>درج</Button><Button onClick={() => setModal(true)}>نافذة</Button><Button type="primary" icon={<PlusOutlined />}>إضافة</Button></>}
      />

      <KpiRow>
        <KpiCard label="المهام المفتوحة" value={42} sub="هذا الأسبوع" icon={<AppstoreOutlined />} tone="solid" onClick={() => undefined} hint="فتح القائمة" />
        <KpiCard label="منجزة" value="86%" icon={<CheckCircleOutlined />} tone="gradient" />
        <KpiCard label="قريبة الموعد" value={7} icon={<ClockCircleOutlined />} tone="amber" />
        <KpiCard label="متأخرة" value={3} icon={<FireOutlined />} alert />
      </KpiRow>

      <TabsBar
        defaultActiveKey="table"
        items={[
          {
            key: 'table', label: 'جدول',
            children: (
              <>
                <FilterBar end={`${rows.length} عناصر`}>
                  <Segmented options={['الكل', 'مفتوحة', 'منجزة']} />
                  <Select allowClear placeholder="كل الأعضاء" style={{ width: 160 }} options={rows.map((r) => ({ value: r.owner, label: r.owner }))} />
                  <Input.Search placeholder="بحث" style={{ width: 200 }} />
                </FilterBar>
                <DataTable<Row>
                  card={false}
                  rowKey="id"
                  dataSource={rows}
                  pagination={false}
                  highlightKey={flash}
                  onRowClick={(r) => { setFlash(undefined); setTimeout(() => setFlash(r.id), 0); }}
                  columns={[
                    { title: 'المهمة', dataIndex: 'name', render: (v: string, r) => <div><b>{v}</b><div className="auf-muted" style={{ fontSize: 12 }}>{r.owner}</div></div> },
                    { title: 'العضو', dataIndex: 'owner', render: (v: string, _r, i) => <Space><UserAvatar name={v.replace('عضو ', '')} index={i} size={28} />{v}</Space> },
                    { title: 'الموعد', dataIndex: 'due', render: (v: string) => <span className="auf-num">{v}</span> },
                    { title: 'الحالة', dataIndex: 'status', render: (v: Tone, r) => <StatusTag tone={v} label={r.label} /> },
                    { title: 'التقدم', dataIndex: 'progress', width: 160, render: (v: number) => <ProgressBar percent={v} /> },
                  ]}
                />
              </>
            ),
          },
          {
            key: 'tokens', label: 'الألوان والرموز',
            children: (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {Object.entries(brand).map(([k, c]) => (
                    <div key={k} style={{ textAlign: 'center', fontSize: 12 }}>
                      <div style={{ width: 64, height: 44, borderRadius: radius.sm, background: c, border: '1px solid rgba(0,0,0,.06)' }} />
                      <span className="auf-num">{k}</span>
                    </div>
                  ))}
                </div>
                <Space wrap>{(Object.keys(tones) as Tone[]).map((t) => <StatusTag key={t} tone={t} label={t} />)}</Space>
                <Space wrap><Badge tone="info">S</Badge><Badge tone="warning">M</Badge><Badge tone="success" title="كبيرة">L</Badge><ColorDot color="#e91e63" /><ColorDot color={brand[700]} size={14} /></Space>
                <Space wrap>{[0, 1, 2, 3, 4, 5, 6].map((i) => <UserAvatar key={i} name={'أبجدهوز'[i]} index={i} />)}<UserAvatar name="ر" ring="#38bdf8" /></Space>
              </Space>
            ),
          },
          { key: 'empty', label: 'حالة فارغة', children: <EmptyState description="لا توجد عناصر بعد" action={<Button type="primary">إضافة أول عنصر</Button>} /> },
        ]}
      />

      <div style={{ height: 16 }} />
      <GlassCard title="بطاقة زجاجية" extra={<a>المزيد</a>}>
        <p className="auf-muted" style={{ margin: 0 }}>المحتوى داخل بطاقة بنفس الأسلوب: خلفية شفافة، حدود بيضاء، ظل خفيف.</p>
      </GlassCard>

      <Drawer {...drawerProps} open={drawer} onClose={() => setDrawer(false)} title="تفاصيل (للقراءة فقط)">
        <p>درج بنفس الأسلوب الزجاجي.</p>
        <StatusTag tone="warning" label="قيد الإنجاز" />
      </Drawer>
      <Modal open={modal} onCancel={() => setModal(false)} onOk={() => setModal(false)} title="نافذة" okText="حفظ" cancelText="إلغاء">
        <p>نافذة زجاجية بزوايا 24px.</p>
      </Modal>
    </AppShell>
  );
}

createRoot(document.getElementById('root')!).render(
  <DesignSystemProvider locale={arEG}>
    <Demo />
  </DesignSystemProvider>,
);
