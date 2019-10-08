<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <title>Arquivo dos Arqueossítios Portugueses</title>
                    <meta charset="UTF-8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body style="margin: 2%">
                    <h1>Arquivo dos Arqueossítios Portugueses</h1>
                    <h3>Índice dos Arqueossítios</h3>
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="{generate-id()}"/>
            <a href="arq-{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>

    <xsl:template match="ARQELEM">
        <xsl:result-document href="website/arq-{generate-id()}.html">
            <html>
                <head>
                    <title>Arquivo dos Arqueossítios Portugueses: página de arqueossítio</title>
                    <meta charset="UTF-8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body style="margin: 2%">
                    <table class="w3-table-all">
                        <tr>
                            <th>Identificação</th>
                            <td>
                                <xsl:value-of select="IDENTI"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Descrição</th>
                            <td>
                                <xsl:value-of select="DESCRI"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Lugar</th>
                            <td>
                                <xsl:value-of select="LUGAR"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Freguesia</th>
                            <td>
                                <xsl:value-of select="FREGUE"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Concelho</th>
                            <td>
                                <xsl:value-of select="CONCEL"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Latitude</th>
                            <td>
                                <xsl:value-of select="LATITU"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Longitude</th>
                            <td>
                                <xsl:value-of select="LONGIT"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Altitude</th>
                            <td>
                                <xsl:value-of select="ALTITU"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Acesso</th>
                            <td>
                                <xsl:value-of select="ACESSO"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Duração</th>
                            <td>
                                <xsl:value-of select="CONCEL"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Autor</th>
                            <td>
                                <xsl:value-of select="AUTOR"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Data</th>
                            <td>
                                <xsl:value-of select="DATA"/>
                            </td>
                        </tr>
                    </table>
                    <hr/>
                    <address>
                        <a href="index.html#{generate-id()}">Voltar ao índice</a>
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>
  