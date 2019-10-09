<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:output method="html" encoding="UTF-8" indent="yes" />

    <xsl:template match="ARQELEM">
        <html>
            <head>
                <title>
                    Arqueossítios Portugueses:
                    <xsl:value-of select="IDENTI" />
                </title>
                <meta charset="UTF-8" />
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
            </head>
            <body style="margin: 2%">
                <h1 style="text-align: center">
                    <xsl:value-of select="IDENTI" />
                </h1>
                <h2 style="text-align: center">
                    Arqueossítio do concelho de
                    <xsl:value-of select="CONCEL" />
                </h2>
                <table class="w3-table-all">
                    <tr>
                        <th style="text-align: center">Identificação</th>
                        <td>
                            <xsl:value-of select="IDENTI" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Descrição</th>
                        <td>
                            <xsl:value-of select="DESCRI" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Lugar</th>
                        <td>
                            <xsl:value-of select="LUGAR" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Freguesia</th>
                        <td>
                            <xsl:value-of select="FREGUE" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Latitude</th>
                        <td>
                            <xsl:value-of select="LATITU" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Longitude</th>
                        <td>
                            <xsl:value-of select="LONGIT" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Altitude</th>
                        <td>
                            <xsl:value-of select="ALTITU" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Acesso</th>
                        <td>
                            <xsl:value-of select="ACESSO" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Duração</th>
                        <td>
                            <xsl:value-of select="CONCEL" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Autor</th>
                        <td>
                            <xsl:value-of select="AUTOR" />
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">Data</th>
                        <td>
                            <xsl:value-of select="DATA" />
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>