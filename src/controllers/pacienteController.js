const pacienteModel = require('../models/paciente');
const escolaridadModel = require('../models/escolaridad');
const comunidadModel = require('../models/comunidad_linguistica');
const profesionModel = require('../models/profesion');
const discapacidadModel = require('../models/discapacidad');
const puebloModel = require('../models/pueblo');
const municipioModel = require('../models/municipio');
const departamentoModel = require('../models/departamento');
const { format } = require('date-fns');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

const guardarDatos = (model, redirect) => async (req, res) => {
    try {
        await model(req.body);
        req.flash('success_msg', 'Datos Guardados Correctamente');
        res.redirect(redirect);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al guardar ${redirect.slice(7)}`);
    }
};

exports.paciente = async (req, res) => {
    try {
        const escolaridades = await escolaridadModel.getEscolaridad();
        const comunidades = await comunidadModel.getComunidad_Linguistica();
        const profesiones = await profesionModel.getProfesion();
        const discapacidades = await discapacidadModel.getDiscapacidad();
        const pueblos = await puebloModel.getPueblo();
        const municipios = await municipioModel.getMunicipio();
        const departamentos = await departamentoModel.getDepartamento();

        res.render('add/paciente', {
            title: 'Añadir Paciente',
            escolaridades, comunidades, profesiones, discapacidades, pueblos, municipios, departamentos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
};

exports.addPaciente = guardarDatos(pacienteModel.addPaciente, '/paciente/table');

exports.getPaciente = async (req, res) => {
    try {
        const pacientes = await pacienteModel.getPaciente();
        const pacientesFormateados = pacientes.map(paciente => {
            return {
                ...paciente,
                Fecha_nacimiento: format(new Date(paciente.Fecha_nacimiento), 'dd/MM/yyyy'),
                IGSS: paciente.IGSS === 'S' ? 'Sí' : 'No',
                Genero: paciente.Genero === 'M' ? 'Masculino' : 'Femenino'
            };
        });
        res.render('tables/paciente', {
            title: 'Paciente',
            pacientes: pacientesFormateados
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
};

exports.updatePaciente = async (req, res) => {
    try {
        await pacienteModel.updatePaciente(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/paciente/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el paciente');
    }
};

exports.getPacienteById = async (req, res) => {
    try {
        const paciente = await pacienteModel.getPacienteById(req.params.id);
        const escolaridades = await escolaridadModel.getEscolaridad();
        const comunidades = await comunidadModel.getComunidad_Linguistica();
        const profesiones = await profesionModel.getProfesion();
        const discapacidades = await discapacidadModel.getDiscapacidad();
        const pueblos = await puebloModel.getPueblo();
        const municipios = await municipioModel.getMunicipio();
        const departamentos = await departamentoModel.getDepartamento();

        const formattedPaciente = {
            ...paciente,
            Fecha_nacimiento: format(new Date(paciente.Fecha_nacimiento), 'yyyy-MM-dd')
        };
        res.render('update/paciente', {
            title: 'Actualizar Paciente',
            paciente: formattedPaciente,
            escolaridades,
            comunidades,
            profesiones,
            discapacidades,
            pueblos,
            municipios,
            departamentos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el paciente');
    }
};

exports.deletePaciente = async (req, res) => {
    try {
        await pacienteModel.deletePaciente(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/paciente/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el paciente');
    }
};

exports.exportarPacientesExcel = async (req, res) => {
    try {
        const pacientes = await pacienteModel.getPaciente();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Pacientes');

        worksheet.columns = [
            { header: 'DPI', key: 'DPI', width: 15 },
            { header: 'Primer Nombre', key: 'Primer_nombre', width: 20 },
            { header: 'Segundo Nombre', key: 'Segundo_nombre', width: 20 },
            { header: 'Tercer Nombre', key: 'Tercer_nombre', width: 20 },
            { header: 'Primer Apellido', key: 'Primer_apellido', width: 20 },
            { header: 'Segundo Apellido', key: 'Segundo_apellido', width: 20 },
            { header: 'Fecha de Nacimiento', key: 'Fecha_nacimiento', width: 18 },
            { header: 'Teléfono', key: 'Telefono', width: 15 },
            { header: 'IGSS', key: 'IGSS', width: 10 },
            { header: 'Género', key: 'Genero', width: 12 },
            { header: 'Escolaridad', key: 'Nivel_Escolaridad', width: 25 },
            { header: 'Comunidad Lingüística', key: 'Nombre_Comunidad_Linguistica', width: 25 },
            { header: 'Profesión', key: 'Profesion_Oficio', width: 25 },
            { header: 'Discapacidad', key: 'Tipo_Discapacidad', width: 25 },
            { header: 'Pueblo', key: 'Nombre_Pueblo', width: 25 },
            { header: 'Municipio', key: 'Nombre_Municipio', width: 25 },
            { header: 'Departamento', key: 'Nombre_Departamento', width: 25 }
        ];

        pacientes.forEach(p => {
            worksheet.addRow({
                ...p,
                IGSS: p.IGSS === 'S' ? 'Sí' : 'No',
                Genero: p.Genero === 'M' ? 'Masculino' : 'Femenino'
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=pacientes.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al exportar a Excel');
    }
};

exports.exportarPacientesPDF = async (req, res) => {
    try {
        const pacientes = await pacienteModel.getPaciente();

        const doc = new PDFDocument({ margin: 40, size: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=pacientes.pdf');

        doc.pipe(res);

        doc.fontSize(18).text('Listado de Pacientes', { align: 'center' });
        doc.moveDown(1.5);

        const indent = 20;

        pacientes.forEach((p, index) => {
            doc.fontSize(12).text(`${index + 1}.   DPI: ${p.DPI}`);
            doc.text(`Nombre: ${p.Primer_nombre} ${p.Segundo_nombre || ''} ${p.Tercer_nombre || ''}`.trim(), { indent });
            doc.text(`Apellidos: ${p.Primer_apellido} ${p.Segundo_apellido || ''}`.trim(), { indent });
            doc.text(`Fecha de Nacimiento: ${new Date(p.Fecha_nacimiento).toLocaleDateString()}`, { indent });
            doc.text(`Teléfono: ${p.Telefono}`, { indent });
            doc.text(`IGSS: ${p.IGSS === 'S' ? 'Sí' : 'No'}`, { indent });
            doc.text(`Género: ${p.Genero === 'M' ? 'Masculino' : 'Femenino'}`, { indent });
            doc.text(`Escolaridad: ${p.Nivel_Escolaridad}`, { indent });
            doc.text(`Comunidad Lingüística: ${p.Nombre_Comunidad_Linguistica}`, { indent });
            doc.text(`Profesión: ${p.Profesion_Oficio}`, { indent });
            doc.text(`Discapacidad: ${p.Tipo_Discapacidad}`, { indent });
            doc.text(`Pueblo: ${p.Nombre_Pueblo}`, { indent });
            doc.text(`Municipio: ${p.Nombre_Municipio}`, { indent });
            doc.text(`Departamento: ${p.Nombre_Departamento}`, { indent });
            doc.moveDown(1.5);
        });

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al exportar a PDF');
    }
};